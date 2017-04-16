import axios from 'axios';

export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNOUT = 'USER_SIGNOUT';

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export function signinSuccess(token, user){
	localStorage.setItem('token', token);
	return {
		type: 'USER_SIGNIN_SUCCESS',
		payload: {
			user: user
		}
	}
}
export function signinFailure(err){
	localStorage.removeItem('token');
	return {
		type: 'USER_SIGNIN_FAILURE',
		payload: {
			errors: err
		}
	}
}
//not used
export function signout(){
	localStorage.removeItem('token');
	return {
		type: 'USER_SIGNOUT'
	}
}

export function signupSuccess(){
	return {
		type: USER_SIGNUP_SUCCESS
	}
}

export function signupFailure(err){
	return {
		type: USER_SIGNUP_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function signinUser(email, password, context, redirect='/'){
	return function(dispatch){

		axios.post('/auth/signin', {email: email, password: password})
			.then(function(res){
				dispatch(signinSuccess(res.data.token, res.data.user));
				context.router.replace(redirect);
			})
			.catch(function(obj){
				dispatch(signinFailure(obj.response.data.errors));
			})

	}
}

export function signupUser(name, email, password, context){
 
  return function(dispatch){

	  axios.post('/auth/signup', { name: name, email: email, password: password})
	  	.then(function(res){
	  		dispatch(signupSuccess());
	  		context.router.replace('/signin');
	  	})
	  	.catch(function(obj){
	  		dispatch(signupFailure(obj.response.data.errors));
	  	});

  }
 
}


export function getCurrentUser(){
	axios.get('/auth/getcurrentuser', {token: localStorage.getItem('token')})
		.then(function(res){
			dispatch(getCurrentUserSuccess(res.user));
		})
		.then(function(err){
			dispatch(getCurrentUserFailure(err));
		});
}

export function getCurrentUserSuccess(user){
	return {
		type: 'GET_CURRENT_USER_SUCCESS',
		payload: user
	}
}
export function getCurrentUserFailure(err){
	return {
		type: 'GET_CURRENT_USER_FAILURE',
		payload: {
			errors: err
		}
	}
}



