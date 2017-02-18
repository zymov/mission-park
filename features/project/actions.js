import axios from 'axios';

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export function addProject(payload){

	return function(dispatch){
		dispatch(addProjectRequest());
		axios.post('/projects/addproject',payload)
		.then(function(res){
			dispatch(addProjectSuccess(res.data.project));
			// console.log(res.data.message, res.data.owner);
		})
		.catch(function(err){
			dispatch(addProjectFailure(err));
		});	
	}
	
}

export function addProjectRequest(){
	return {
		type: 'ADD_PROJECT_REQUEST'
	}
}

export function addProjectSuccess(project){
	return {
		type: 'ADD_PROJECT_SUCCESS',
		payload: project
	}
}

export function addProjectFailure(err){
	return {
		type: 'ADD_PROJECT_FAILURE',
		payload: {
			errors: err
		}
	}
}

export function fetchProject(){
	return function(dispatch){
		dispatch(fetchProjectRequest());
		axios.get('/projects/fetch')
		.then(function(res){
			dispatch(fetchProjectSuccess(res.data.projects));
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