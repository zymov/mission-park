const express = require('express');
// const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

function validateSignupForm(){

}

function validateSigninForm(){

}


router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/signin',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.post('/signin', passport.authenticate('local-signin', {
	successRedirect: '/',
	failureRedirect: '/signin',
	failureFlash: true
}))


module.exports = router;