// const firebase = require('firebase');
import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyDbOhdxctAyUdSrr0xbDxSazzQfu1wYeNY",
    authDomain: "goalsquad-f12a7.firebaseapp.com",
    databaseURL: "https://goalsquad-f12a7.firebaseio.com",
    projectId: "goalsquad-f12a7",
    storageBucket: "goalsquad-f12a7.appspot.com",
    messagingSenderId: "177647825623"
  };
  firebase.initializeApp(config);

// module.exports.firebase = firebase;
export default firebase;