importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDbOhdxctAyUdSrr0xbDxSazzQfu1wYeNY",
    authDomain: "goalsquad-f12a7.firebaseapp.com",
    databaseURL: "https://goalsquad-f12a7.firebaseio.com",
    projectId: "goalsquad-f12a7",
    storageBucket: "goalsquad-f12a7.appspot.com",
    messagingSenderId: "177647825623"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
 const title = payload.data.title;
 const options = {
  body: payload.data.body
 };
 return self.registration.showNotification(title, options);
});