import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function findUserByName(input){
	return function(dispatch){
		dispatch(fetchUsersRequest());
		axios.get('/projects/getusers', {
			userName: input
		})
		.then(function(res){
			dispatch(fetchUsersSuccess(res.data.users));
		})
		.catch(function(err){
			dispatch(fetchUsersFailure(err));
		});
	}
}


export function fetchUsers(dispatch, projectId){
		dispatch( fetchUsersRequest() );
		axios.get('/projects/getusers', {
			projectId: projectId
		})
		.then(function(res){
			dispatch( fetchUsersSuccess(res.data.users) );
		})
		.catch(function(err){
			dispatch( fetchUsersFailure(err) );
		});
}

export function fetchUsersRequest(){
	return {
		type: 'FETCH_USERS_REQUEST'
	}
}

export function fetchUsersSuccess(users){
	return {
		type: 'FETCH_USERS_SUCCESS',
		payload: users
	}
}

export function fetchUsersFailure(err){
	return {
		type: 'FETCH_USERS_FAILURE',
		payload: {
			errors: err
		}
	}
}
