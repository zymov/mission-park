import {createReducer} from '../../utils';
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT} from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
	token: null,
	isAuthenticated: false,
	isAuthenticating: false,
	userName: null,
	statusText: null
}

export default createReducer(initialState, {
	[USER_LOGIN_REQUEST]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticating': true,
			'statusText': null
		});
	},
	[USER_LOGIN_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticated': true,
			'isAuthenticating': false,
			'token': payload.token,
			'userName': jwtDecode(payload.token).userName,
      'statusText': 'You have been successfully logged in.'
		});
	},
	[USER_LOGIN_FAILURE]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticating': false,
			'isAuthenticated': false,
			'token': null,
			'userName': null,
			'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
		});
	},
	[USER_LOGOUT]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticated': false,
			'token': null,
			'userName': null,
			'statusText': 'You have been successfully logged out.'
		});
	}
});