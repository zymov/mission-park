const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

function validateSignupForm(formBody){
	const errors = {};
	let isFormValid = true;
	let message = '';

	if(!formBody || typeof formBody.email !== 'string' || !validator.isEmail(formBody.email)){
		isFormValid = false;
		errors.email = 'Please provide a correct email address.';
	}
	if(!formBody || typeof formBody.password !== 'string' || formBody.password.trim().length < 6){
		isFormValid = false;
		errors.password = 'Password must have at least 6 characters.';
	}
	if(!formBody || typeof formBody.name !== 'string' || formBody.name.trim().length === 0){
		isFormValid = false;
		errors.name = 'Please provide your name.';
	}
	if(!isFormValid){
		message = 'Check the form for errors.';
	}
	return {
		success: isFormValid,
		message,
		errors
	};
}

function validateSigninForm(formBody){
	const errors = {};
  let isFormValid = true;
  let message = '';

  if (!formBody || typeof formBody.email !== 'string' || formBody.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!formBody || typeof formBody.password !== 'string' || formBody.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


router.post('/signup', (req, res, next)=>{
	const validationResult = validateSignupForm(req.body);

	if(!validationResult.success){
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

	return passport.authenticate('local-signup', (err)=> {
		if(err){

			if(err.name === 'MongoError' && err.code === 11000){
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
				return res.status(409).json({
					success: false,
					message: 'Check the form for errors.',
					errors: {
						email: 'This email is already taken.'
					}
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Could not process the form.',
			});

		}

		return res.status(200).json({
			success: true,
			message: 'You have successfully signed up! Now you should be able to log in.'
		});

	})(req, res, next);

	//  {
	// 	successRedirect: '/signin',
	// 	failureRedirect: '/signup',
	// 	failureFlash: true
	// }
	
});

router.post('/signin', (req, res, next)=>{
  const validationResult = validateSigninForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signin', (err, token, userData)=>{
  	if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });

  })(req, res, next);

});
// {
// 	successRedirect: '/',
// 	failureRedirect: '/signin',
// 	failureFlash: true
// }


module.exports = router;