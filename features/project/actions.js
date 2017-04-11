import axios from 'axios';
import { openNotification } from '../common/actions';

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

export function addProject(payload){

	return function(dispatch){
		dispatch(addProjectRequest());
		dispatch(openNotification());
		axios.post('/projects/addproject',payload)
		.then(function(res){
			dispatch(addProjectSuccess(res.data.project));
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
		dispatch(openNotification());
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


export function deleteProject(projectId){
	return function(dispatch){
		dispatch(deleteProjectRequest());
		axios.delete('/projects/deleteproject', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch(deleteProjectSuccess(res.data.projectId));
		})
		.catch(function(err){
			dispatch(deleteProjectFailure(err));
		});
	}
}

export function deleteProjectRequest(){
	return {
		type: 'DELETE_PROJECT_REQUEST'
	}
}

export function deleteProjectSuccess(projectId){
	return {
		type: 'DELETE_PROJECT_SUCCESS',
		payload: projectId
	}
}

export function deleteProjectFailure(err){
	return {
		type: 'DELETE_PROJECT_FAILURE'
	}
}


