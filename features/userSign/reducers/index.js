import {createReducer} from '../../../utils';
import * as types from '../constants';

const initialState = {
	isAuthenticated: false,
	userName: null,
	userSaved: false,
	signinErrors: {},
	signupErrors: {}
}

export default function auth(state = initialState, action){
	switch (action.type) {
		case types.USER_SIGNUP_SUCCESS:
			return Object.assign({}, state, {
				userSaved: true,
				signupErrors: {}
			});
		case types.USER_SIGNUP_FAILURE: 
			return Object.assign({}, state, {
				userSaved: false,
				signupErrors: action.payload.errors
			});
		case types.USER_SIGNIN_SUCCESS: 
			return Object.assign({}, state, {
				isAuthenticated: true,
				signinErrors: {}
			});
		case types.USER_SIGNIN_FAILURE: 
			return Object.assign({}, state, {
				isAuthenticated: false,
				signinErrors: action.payload.errors
			});
		default:
			return state;
	}
}