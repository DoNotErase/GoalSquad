// const firebase = require('firebase');
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDbOhdxctAyUdSrr0xbDxSazzQfu1wYeNY',
  authDomain: 'goalsquad-f12a7.firebaseapp.com',
  databaseURL: 'https://goalsquad-f12a7.firebaseio.com',
  projectId: 'goalsquad-f12a7',
  storageBucket: 'goalsquad-f12a7.appspot.com',
  messagingSenderId: '177647825623',
};

firebase.initializeApp(config);

export default firebase;
