const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
	try {
		if (user.email &&
			user.email.endsWith('@lunebleue.coop') &&
			user.emailVerified) {
			await admin.auth().setCustomUserClaims(user.uid, { authorized: true });
			console.log(`\`authorized\` claim applied on user ${user.email}`)
		} else {
			console.log(`user ${user.email} ineligible for \`authorized\` claim`)
		}
	} catch (e) {
		console.log('error on processSignUp', e)
	}
});