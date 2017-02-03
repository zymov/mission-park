// import 'whatwg-fetch';
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNOUT, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE} from '../constants';

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNOUT = 'USER_SIGNOUT';

//not used
export function signinRequest(){
	return {
		type: 'USER_SIGNIN_REQUEST'
	}
}
export function signinSuccess(token){
	localStorage.setItem('token', token);
	return {
		type: 'USER_SIGNIN_SUCCESS'
		// payload: {
			// token: token
		// }
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
		// dispatch(signinRequest());
		const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
		const xhr = new XMLHttpRequest();
		xhr.open('post', '/auth/signin');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';
		xhr.addEventListener('load', ()=>{
			if(xhr.status === 200){
				dispatch(signinSuccess(xhr.response.token));
				context.router.replace(redirect);
			} else {
				const errors = xhr.response.errors ? xhr.response.errors : {};
				errors.summary = xhr.response.message;
				dispatch(signinFailure(errors));
			}
		});
		xhr.send(formData);
	}
}

export function signupUser(name, email, password, context){
  const formData = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
 
  return function(dispatch){

 		// create an AJAX request
	  const xhr = new XMLHttpRequest();
	  xhr.open('post', '/auth/signup');
	  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	  xhr.responseType = 'json';
	  xhr.addEventListener('load', () => {
	    if (xhr.status === 200) {
	      // success
	      dispatch(signupSuccess());
	      // set a message
	      localStorage.setItem('successMessage', xhr.response.message);
	      // make a redirect
	      context.router.replace('/signin');

	    } else {
	      // failure
	      const errors = xhr.response.errors ? xhr.response.errors : {};
	      errors.summary = xhr.response.message;
	      dispatch(signupFailure(errors));
	    }
	  });
	  xhr.send(formData);
  }
 
  // var myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');

  // return function(dispatch) {
	 //  return fetch('/auth/signup', {
	 //  	method: 'POST',
	 //  	headers: myHeaders,
	 //  	mode: 'cors',
	 //  	body: JSON.stringify({
	 //  		name: name,
	 //  		email: email,
	 //  		password: password
	 //  	})
	 //  }).then( response => {
	 //  	if(response.ok){
	 //  		dispatch(signupSuccess());
	 //  		localStorage.setItem('successMessage', response.message);
	 //  		response.redirect('/signin');
	 //  	} else {
	 //  		const errors = response.status ? response.status : {};
	 //  		var payload = {
	 //  			errors: {
	 //  				errors: errors,

	 //  			}
	 //  		}
	 //  		dispatch(signupFailure(errors));
	 //  	}
	 //  });
  // }
}

export function receivePersonalHomeData(data) {
	return {
		type: RECEIVE_PERSONAL_HOME_DATA,
    payload: {
      data: data
    }
	}
}

export function fetchPersonalHomeDataRequest() {
  return {
    type: FETCH_PERSONAL_HOME_DATA_REQUEST
  }
}

export function fetchPersonalHomeData(token) {
	return (dispatch, state) => {
		dispatch(fetchPersonalHomeDataRequest());
		const xhr = new XMLHttpRequest();
    xhr.open('get', '/');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        dispatch(receiveProtectedData(xhr.response.data))
      } else {
      	// if()
      }
    });
    xhr.send();
	}
}
