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

app.get('/auth/fitbit/success', async (req, res) => {
  try {
    const token = await db.getAccessToken(req.session.passport.user.id);
    try {
      const activities = await axios.get('https://api.fitbit.com/1/user/-/activities.json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('activityes', activities);
      const userID = req.session.passport.user.id;
      await Promise.all([
        db.newUserLifetimeDistance(userID, activities.data.lifetime.total.distance),
        db.newUserLifetimeSteps(userID, activities.data.lifetime.total.steps),
        db.newUserLifetimeFloors(userID, activities.data.lifetime.total.floors),
      ]);
      await db.updateGoalStatuses();
      res.redirect('/incubator');
    } catch (err) {
      console.log('probably a new user', token);
      res.redirect('/auth/fitbit/failure');
    }
  } catch (err) {
    console.log('hello was in success then failed');
    res.redirect('/auth/fitbit/failure');
  }
});

app.get('/auth/fitbit/failure', (req, res) => {
  console.log('authenticaiton failure!');
  res.status(401).send('authentication failure!');
});

app.post('/fitbit/deauthorize/', async (req, res) => {
  try {
    const token = await db.getAccessToken(req.session.passport.user.id);
    await axios.post(
      `https://api.fitbit.com/oauth2/revoke?token=${token}`,
      null,
      {
        headers:
        {
          Authorization: `Basic ${(Buffer.from(`${config.fitbit.id}:${config.fitbit.secret}`)).toString('base64')};`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  } catch (err) {
    res.status(500).send(err);
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
      res.status(401).send('bad passport');
    }
  }
  try {
    const data = await db.getEggInfo(userID);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('err in get Egg info');
  }
});

/** *******************GOAL STUFF**************************** */

app.get('/userGoals', async (req, res) => {
  if (req.session.passport) {
    if (!req.query.type) {
      try {
        const userGoals = await db.getActiveUserGoals(req.session.passport.user.id);
        res.json(userGoals);
      } catch (err) {
        res.status(500).send('err in getActiveUserGoals');
      }
    } else if (req.query.type === 'all') {
      try {
        const userGoals = await db.getUserGoals(req.session.passport.user.id);
        res.json(userGoals);
      } catch (err) {
        res.status(500).send('err in get userGoals');
      }
    } else {
      res.status(500).send('type of goal not yet recognized!');
    }
  } else {
    res.status(401).send('bad passport');
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
    start: req.body.startDate,
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
      res.status(401).json({ error: 'user not authenticated' });
    }
  } catch (err) {
    console.log(err.response.data);
    res.status(500).send('could not create goal');
  }
});

app.post('/createCustomGoal', async (req, res) => {
  const customGoal = {
    userID: '',
    goalName: req.body.goalName,
    goalActivity: req.body.goalActivity,
    goalAmount: req.body.goalAmount,
    goalLength: req.body.goalLength,
    points: req.body.points,
    start: req.body.startDate,
  };
  try {
    if (req.session.passport) {
      customGoal.userID = req.session.passport.user.id;

      await db.createCustomGoal(customGoal);
      res.end();
    } else {
      res.status(401).json({ error: 'user not authenticated' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('could not create goal');
  }
});

app.patch('/completeGoal', async (req, res) => {
  try {
    const userGoalID = req.body.goalID;
    await db.completeGoalSuccess(userGoalID);
    res.end();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/failGoal', async (req, res) => {
  try {
    const userGoalID = req.body.goalID;
    await db.completeGoalFailure(userGoalID);
    res.end();
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ********************** EGGS / SQUADDIES ******************************** */

app.post('/hatchEgg', async (req, res) => {
  try {
    const userID = req.session.passport.user.id;
    const userEggID = req.body.eggID;
    const newSquaddie = db.hatchEgg(userEggID, userID, req.body.xp);
    res.json(newSquaddie[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ********************** USER DEETS *********************************** */

app.get('/userDeets', async (req, res) => {
  try {
    const details = await db.getUserDeets(req.session.passport.user.id);
    res.json(details);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ********************************************************* */

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-client/dist', '/index.html'));
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});

