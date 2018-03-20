const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const passport = require('passport');
const config = require('../config.js');
const axios = require('axios');
const path = require('path');

const app = express();
// http for streaming and .server for event listeners
const server = require('http').Server(app);
const io = require('socket.io')(server);

const db = require('../database-mysql/index.js');

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true,
}));

/** **************OAUTH**************** */

passport.use(new FitbitStrategy(
  {
    clientID: config.fitbit.id,
    clientSecret: config.fitbit.secret,
    scope: ['activity', 'profile', 'sleep', 'social'],
    callbackURL: 'http://localhost:8080/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      if (await db.userExists(profile.id)) {
        await db.updateTokens(profile.id, accessToken, refreshToken);
        return done(null, profile);
      }
      await db.createUser(profile.id, profile.displayName, accessToken, refreshToken);
      return done(null, profile);
    } catch (e) {
      return done(e);
    }
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/auth/fitbit',
  passport.authenticate(
    'fitbit',
    { scope: ['activity', 'heartrate', 'location', 'profile'] },
  ),
);

app.get('/callback', passport.authenticate('fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure',
}));

app.get('/auth/fitbit/success', (req, res) => {
  res.redirect('/landing');
});

app.get('/auth/fitbit/failure', (req, res) => {
  res.status(401).json({ err: 'failure!' });
});

app.post('/fitbit/deauthorize', async (req, res) => {
  try {
    await axios.post('https://api.fitbit.com/oauth2/revoke', {
      headers: {
        Authorization: `Basic  ${new Buffer(`${config.fitbit.id}:${config.fitbit.secret}`).toString('base64')}`,
      },
      data: {
        token: req.session.passport.user.id,
      },
    });

    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

/** *******************FITBIT FETCHES**************************** */

app.get('/login', async (req, res) => {
  if (req.session.passport) {
    const user = await db.getUserByID(req.session.passport.user.id);
    res.json(user);
  } else {
    res.json();
  }
});

app.get('/fitbit/lifetime', async (req, res) => {
  try {
    const token = await db.getAccessToken(req.session.passport.user.id);
    const activities = await axios.get('https://api.fitbit.com/1/user/-/activities.json', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(activities.data); // TODO: replace this with db storage?
  } catch (err) {
    res.status(401).send(err);
  }
});

app.get('/fitbit/dailySummary', async (req, res) => {
  const { date } = req.query; // must be in YYYY-MM-DD format string
  const token = db.getAccessToken(req.session.passport.user.id);
  try {
    const summary = await axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
      headers: {
        Authorization: `Bearer ${token}`, // TODO: replace this with db call based on req.session.passport.user.id
      },
    });
    res.json(summary.data);
  } catch (err) {
    res.status(401).send(err);
  }
});

/** *******************FITBIT SUBSCRIPTION*************************** */
app.post('/fitbit-notifications', async (req, res) => {
  res.status(204).end();
});

/** *******CLIENT SIDE FETCHES ************** */
app.get('/eggStatus', async (req, res) => {
  let userID;
  if (req.session.passport) {
    if (req.session.passport) {
      userID = req.session.passport.user.id;
    } else {
      res.status(401).end();
    }
  }
  const data = await db.getEggInfo(userID);
  res.status(200).send(data);
});

/** *******************GOAL STUFF**************************** */
app.get('/userGoals', async (req, res) => {
  if (req.session.passport) {
    if (!req.query.type) {
      try {
        const userGoals = await db.getUserGoals(req.session.passport.user.id);
        res.json(userGoals);
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
    } else if (req.query.type === 'active') {
      try {
        const userGoals = await db.getActiveUserGoals(req.session.passport.user.id);
        res.json(userGoals);
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
    } else {
      console.log('type of goal not yet recognized!');
      res.end();
    }
  } else {
    console.log('bad passport');
    res.status(401).end();
  }
});

app.get('/defaultGoals', async (req, res) => {
  try {
    const goals = await db.getDefaultGoals();
    res.json(goals);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/createUserGoal', async (req, res) => {
  // req.body needs: goal_id, deadline existance(deadline(length)), goal points
  const newGoal = {
    userID: '',
    goalID: req.body.goalID,
    startValue: 0,
    targetValue: 0,
    goalLength: req.body.goalLength,
    points: req.body.points,
  };
  try {
    if (req.session.passport) {
      newGoal.userID = req.session.passport.user.id;
      const token = await db.getAccessToken(req.session.passport.user.id);
      let currentLifeTime = await axios.get('https://api.fitbit.com/1/user/-/activities.json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      currentLifeTime = currentLifeTime.data;
      const goalDetails = await db.getGoalInfo(newGoal.goalID);
      newGoal.startValue = currentLifeTime.lifetime.total[goalDetails.goal_activity];
      newGoal.targetValue = newGoal.startValue + goalDetails.goal_amount;
      await db.createUserGoal(newGoal);
      res.end();
    } else {
      console.log('bad passport');
      res.status(401).json({ error: 'user not authenticated' });
    }
  } catch (err) {
    console.log('server err', err);
    res.status(500).end();
  }
});

app.patch('/completeGoal', async (req, res) => {
  const userGoalID = req.body.goalID;
  await db.completeGoalSuccess(userGoalID);
  res.end();
});

app.patch('/failGoal', async (req, res) => {
  const userGoalID = req.body.goalID;
  await db.completeGoalFailure(userGoalID);
  res.end();
});

/** ********************** EGGS / SQUADDIES ******************************** */

app.post('/hatchEgg', async (req, res) => {
  let userID;
  if (req.session.passport) {
    userID = req.session.passport.user.id;
  } else {
    res.status(401).end();
  }
  const userEggID = req.body.eggID;
  const newSquaddie = db.hatchEgg(userEggID, userID);
  res.json(newSquaddie[0]);
});

/** ********************************************************* */
app.get('/test', async (req, res) => {
  res.json(await db.findUserId());
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-client/dist', '/index.html'));
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});

