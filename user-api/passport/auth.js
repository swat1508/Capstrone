const passport 	= require('passport'),
LocalStrategy 		= require('passport-local').Strategy,
FacebookStrategy  	= require('passport-facebook').Strategy,
GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');
const config= require("../config/keys");

// Serialize and Deserialize user instances to and from the session.
passport.serializeUser(function(user, done) {
	console.log(user.id);
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
// Plug-in Local Strategy
passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({ username: new RegExp(username, 'i'), socialId: null }, function(err, user) {
		if (err) { 
			return done(err); 
		}
		if (!user) {
			return done(null, false, { message: 'Incorrect username or password.' });
		}
		if(user.blocked){
			return done(null, false, { message: 'user has been bloacked by site admin' });
		}
		user.validatePassword(password, function(err, isMatch) {
			if (err) { 
				return done(err); 
			}
			if (!isMatch){
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			return done(null, user);
		});
	});
	}
));
const verifySocialAccount = function(tokenA, tokenB, data, done) {
	User.findOrCreate(data, function (err, user) {
		if (err) { return done(err); }
		return done(err, user); 
	});
};
// Plug-in Facebook & google Strategies
passport.use(new FacebookStrategy(config.facebook, verifySocialAccount));

passport.use(new GoogleStrategy(config.google, verifySocialAccount));

module.exports=passport;