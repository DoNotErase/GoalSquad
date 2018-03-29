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

messaging.usePublicVapidKey("BM82A28xJ5fYuqFmaOdjPOQZAmzmL0gJvpICyZYqv3tTfkyCgZfHQXCgafhcbXeg2sW01CRBKwF-nSPNxgLCFRg");

//how does this get initiated? 
// would like to send payload based on met condition,
// e.g. if(lessThanOneDayOnGoal(this.state.user.activeGoals)) setBackgroundMessagingHandler(message)
messaging.setBackgroundMessageHandler(function(payload) {
 const title = payload.data.title;
 const options = {
  body: payload.data.body
 };
 return self.registration.showNotification(title, options);
});

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});