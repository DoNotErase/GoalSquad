const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const passport = require('passport');
const config = require('../config.js');
const axios = require('axios');

const app = express();
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
        console.log('user exists');
        await db.updateTokens(profile.id, accessToken, refreshToken);
        return done(null, profile);
      }
      console.log('new user');
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
  res.redirect('/');
});

app.get('/auth/fitbit/failure', (req, res) => {
  res.status(401).json({ err: 'failure!' });
});

/** *********************************************** */

app.get('/user', (req, res) => {
  if (req.session.passport) {
    res.json({ user: req.session.passport.user.displayName });
  } else {
    res.json({ user: 'please connect your account' });
  }
});

app.get('/fitbit/lifetime', async (req, res) => {
  const token = db.getAccessToken(req.session.passort.user.id);
  try {
    const activities = await axios.get('https://api.fitbit.com/1/user/-/activities.json', {
      headers: {
        Authorization: `Bearer ${token}`, // TODO: replace this with db call
      },
    });
    res.json(activities.data); // TODO: replace this with db storage?
  } catch (err) {
    res.status(401).send(err);
  }
});

app.get('/fitbit/dailySummary', async (req, res) => {
  const { date } = req.query; // must be in YYYY-MM-DD format string
  const token = db.getAccessToken(req.session.passort.user.id);
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

app.get('/test', async (req, res) => {
  res.json(await db.findUserId());
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});

