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

// let logger = function (req, res, next) {
//   console.log('!!!!', req.url, req.headers);
//   next();
// }
// app.use(logger);

let globalProfile;
let globalAccessToken;
let globalRefreshToken;
/** **************OAUTH**************** */

// var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;;

passport.use(new FitbitStrategy(
  {
    clientID: config.fitbit.id,
    clientSecret: config.fitbit.secret,
    scope: ['activity', 'profile', 'sleep', 'social'],
    callbackURL: 'http://localhost:8080/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
  // User.findOrCreate({
  //   fitbitId: profile.id
  // }, function (err, user) {
  //   return done(err, user);
  // });
    globalAccessToken = accessToken; // should go in db
    globalRefreshToken = refreshToken; // should go in db
    globalProfile = profile;
    return done(null, profile);
  }),
));

passport.serializeUser((user, done) => {
  console.log('serializing');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  done(null, user);
});

app.get(
  '/auth/fitbit',
  passport.authenticate('fitbit', {
    scope: ['activity', 'heartrate', 'location', 'profile'],
  }),
);

app.get('/callback', passport.authenticate('fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure',
}));

app.get('/auth/fitbit/success', (req, res) => {
  console.log(req.session.passport.user._json);
  console.log('hooray!');
  res.redirect('/');
});

app.get('/auth/fitbit/failure', (req, res) => {
  console.log('boo didn\'t work!');
  res.json({ err: 'failure!' });
});

/** *********************************************** */

app.get('/user', (req, res) => {
  console.log(req.session);
  if (req.session.passport) {
    res.json({ user: req.session.passport.user.displayName });
  } else {
    res.json({ user: 'please connect your account' });
  }
});

app.get('/fitbit/lifetime', (req, res) => {
  console.log(req.session);
  axios.get('https://api.fitbit.com/1/user/-/activities.json', {
    headers: {
      Authorization: `Bearer ${globalAccessToken}`, // TODO: replace this with db call
    },
  })
    .then((data) => {
      res.json(data.data); // TODO: replace this with db storage?
    })
    .catch((err) => {
      console.log('eroror', err);
      res.send(err);
    });
});

app.get('/fitbit/dailySummary', (req, res) => {
  const date = req.query.date; // must be in YYYY-MM-DD format string
  axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
    headers: {
      Authorization: `Bearer ${globalAccessToken}`, // TODO: replace this with db call based on req.session.passport.user.id
    },
  })
    .then((data) => {
      res.json(data.data);
    })
    .catch((err) => {
      console.log('ereror', err);
      res.send(err);
    });
});

app.get('/test', async (req, res) => {
  res.json(await db.findUserId());
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});

