var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var passport = require('passport');
var config = require('../config.js');

var app = express();
var db = require('../database-mysql');

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true
}));

// let logger = function (req, res, next) {
//   console.log('!!!!', req.url, req.headers);
//   next();
// }
// app.use(logger);

let globalProfile;

/****************OAUTH*****************/

var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;;

passport.use(new FitbitStrategy({
    clientID: config.fitbit.id,
    clientSecret: config.fitbit.secret,
    scope: ['activity', 'profile', 'sleep', 'social'],
    callbackURL: "http://127.0.0.1:3000/auth/fitbit/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({
    //   fitbitId: profile.id
    // }, function (err, user) {
    //   return done(err, user);
    // });
    globalProfile = profile;
    return done(null, profile)
  }
));

passport.serializeUser(function (user, done) {
  console.log('serializing', user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('deserializing', user)
  done(null, user);
});

app.get('/auth/fitbit',
  passport.authenticate('fitbit', {
    scope: ['activity', 'heartrate', 'location', 'profile']
  })
);

app.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure'
}));

app.get('/auth/fitbit/success', function (req, res) {
  console.log(req.body, req.headers);
  console.log('hooray!');
  res.json({ user: globalProfile.displayName });
});

app.get('/auth/fitbit/failure', function (req, res) {
  console.log(req.body, req.headers);
  console.log('boo didn\'t work!');
  res.json({err: 'failure!'});
})

/**************************************************/

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

