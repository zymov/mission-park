var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt').jwtSecret;

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
		let sessionUser = { _id: user.id, name: user.name, email: user.email };
	  done(null, sessionUser);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});



	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){

		// process.nextTick(function(){

			User.findOne({'email': email}, function(err, user){
				if(err) {return done(err)}
				if(user){

					var error = new Error('That email is already taken.');
					error.name = 'IncorrectCredentialsError';
					return done(error);

				} else {

					var newUser = new User();
					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					newUser.name = req.body.name.trim();

					newUser.save(function(err){
						if(err) {return done(err);}
						return done(null, newUser);
					});
				}
			});

		// });

	}));




	passport.use('local-signin', new LocalStrategy({

		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true

	}, function(req, email, password, done){

		if(email){
			email = email.toLowerCase();
		}

		// process.nextTick(function(){

		return User.findOne({'email': email}, function(err, user){
				if(err) {return done(err)}
				if(!user){

					var error = new Error('No user found.');
					error.name = 'IncorrectEmail';
					return done(error);

				}
				if(!user.validPassword(password)){

					var error = new Error('Incorrect password.');
					error.name = 'IncorrectPassword';
					return done(error);

				} 
				else {

					const payload = {sub: user._id};
					const token = jwt.sign(payload, jwtSecret);
					// const data = {_id: user._id, name: user.name, email: user.email};

					// return done(null, token, data);	
					return done(null, token, user);
				}
			});

		// });

	}));

}