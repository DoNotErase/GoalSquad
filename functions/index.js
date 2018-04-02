const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = require('../../database-mysql/index.js');

admin.initializeApp(functions.config().firebase);

exports.sendNotifications = async () => {

	const payload = {
		notification: {
			title: 'You have a new message from Goal Squad',
			body: 'This is a test message',
			icon: '',
			click_action: `https://${functions.config().firebase.authDomain}`;
		}
	}

	// create empty array to store tokens from database call below
	var tokens = [];
	// make db call to get all people with notification token
	var tokens  = await db.getUserNotificationTokens()

	return adimin.messaging().sendToDevice(tokens, payload)
	
}