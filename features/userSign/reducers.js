import {createReducer} from '../../utils';
import {USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE} from './actions';
import jwtDecode from 'jwt-decode';

const initialState = {
	isAuthenticated: false,
	userName: null,
	userSaved: false,
	signinErrors: {},
	signupErrors: {},
	currentUser: null
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
				signinErrors: {},
				currentUser: action.payload.user
			});
		case USER_SIGNIN_FAILURE: 
			return Object.assign({}, state, {
				isAuthenticated: false,
				signinErrors: action.payload.errors,
				currentUser: null
			});
		default:
			return state;
	}
}