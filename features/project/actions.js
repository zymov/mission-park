import axios from 'axios';

export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export function addProject(payload){

	return function(dispatch){
		axios.post('/projects/addproject',payload)
		.then(function(res){
			console.log(res.data.message, res.data.owner);
		})
		.catch(function(err){
			console.log(err);
		});	
	}
	
}

export function fetchProject(){
	return function(dispatch){
		dispatch(fetchProjectRequest());
		axios.get('/projects/fetch')
		.then(function(res){
			dispatch(fetchProjectSuccess(res.data));
		})
		.catch(function(err){
			dispatch(fetchProjectFailure(err));
		});
	}
}

export function fetchProjectRequest(){
	return {
		type: 'FETCH_PROJECT_REQUEST'
	}
}

export function fetchProjectSuccess(projects){
	return {
		type: 'FETCH_PROJECT_SUCCESS',
		payload: projects
	}
}

export function fetchProjectFailure(err){
	return {
		type: 'FETCH_PROJECT_FAILURE',
		payload: {
			errors: err
		}
	}
}