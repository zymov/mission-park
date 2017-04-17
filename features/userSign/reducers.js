import {createReducer} from '../../utils';
import {USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE } from './actions';

const initialState = {
	isAuthenticated: false,
	userName: null,
	userSaved: false,
	signinErrors: {},
	signupErrors: {}
}

export default function auth(state = initialState, action){
	switch (action.type) {
		case USER_SIGNUP_SUCCESS:
			return Object.assign({}, state, {
				userSaved: true,
				signupErrors: {}
			});
		case USER_SIGNUP_FAILURE: 
			return Object.assign({}, state, {
				userSaved: false,
				signupErrors: action.payload.errors
			});
		case USER_SIGNIN_SUCCESS: 
			return Object.assign({}, state, {
				isAuthenticated: true,
				signinErrors: {}
			});
		case USER_SIGNIN_FAILURE: 
			return Object.assign({}, state, {
				isAuthenticated: false,
				signinErrors: action.payload.errors
			});
		default:
			return state;
	}
}