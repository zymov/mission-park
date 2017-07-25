import axios from 'axios';
import * as types from '../constants';
// export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
// export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';
// export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
// export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
// export const USER_SIGNOUT = 'USER_SIGNOUT';

export function signinSuccess(token){
	localStorage.setItem('token', token);
	return {
		type: types.USER_SIGNIN_SUCCESS
	}
}
export function signinFailure(err){
	localStorage.removeItem('token');
	return {
		type: types.USER_SIGNIN_FAILURE,
		payload: {
			errors: err
		}
	}
}
//not used
export function signout(){
	localStorage.removeItem('token');
	return {
		type: types.USER_SIGNOUT
	}
}

export function signupSuccess(){
	return {
		type: types.USER_SIGNUP_SUCCESS
	}
}

export function signupFailure(err){
	return {
		type: types.USER_SIGNUP_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function signinUser(email, password, context, redirect='/'){
	return function(dispatch){

		axios.post('/auth/signin', {email: email, password: password})
			.then(function(res){
				dispatch(signinSuccess(res.data.token));
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



