import {createReducer} from '../../utils';
// import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, USER_SIGNOUT} from '../constants';
import {USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE} from './actions';
import jwtDecode from 'jwt-decode';

const initialState = {
	// token: null,
	isAuthenticated: false,
	// isAuthenticating: false,
	userName: null,
	// statusText: null,
	userSaved: false,
	signinErrors: {},
	signupErrors: {}
}

// export default createReducer(initialState, {
// 	[USER_SIGNIN_REQUEST]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'isAuthenticating': true,
// 			'statusText': null
// 		});
// 	},
// 	[USER_SIGNIN_SUCCESS]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'isAuthenticated': true,
// 			'isAuthenticating': false,
// 			'token': payload.token,
// 			'userName': jwtDecode(payload.token).userName,
//       'statusText': 'You have been successfully logged in.'
// 		});
// 	},
// 	[USER_SIGNIN_FAILURE]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'isAuthenticating': false,
// 			'isAuthenticated': false,
// 			'token': null,
// 			'userName': null,
// 			'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
// 		});
// 	},
// 	[USER_SIGNUP_SUCCESS]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'userSaved': true,
// 			'errors': payload.errors
// 		});
// 	},
// 	[USER_SIGNUP_FAILURE]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'userSaved': false,
// 			'errors': payload.errors
// 		})
// 	},
// 	[USER_SIGNOUT]: (state, payload) => {
// 		return Object.assign({}, state, {
// 			'isAuthenticated': false,
// 			'token': null,
// 			'userName': null,
// 			'statusText': 'You have been successfully logged out.'
// 		});
// 	}
// });

export default function auth(state = initialState, action){
	switch (action.type) {
		case USER_SIGNUP_SUCCESS:
			return Object.assign({}, state, {
				'userSaved': true,
				'signupErrors': {}
			});
		case USER_SIGNUP_FAILURE: 
			return Object.assign({}, state, {
				'userSaved': false,
				'signupErrors': action.payload.errors
			});
		case USER_SIGNIN_SUCCESS: 
			return Object.assign({}, state, {
				'isAuthenticated': true,
				'signinErrors': {}
			});
		case USER_SIGNIN_FAILURE: 
			return Object.assign({}, state, {
				'isAuthenticated': false,
				'signinErrors': action.payload.errors
			})
		default:
			return state;
	}
}