import axios from 'axios';
import { openNotification } from '../../common/actions';
import * as types from '../constants';

export function addProject(payload){

	return function(dispatch){
		dispatch(addProjectRequest());
		dispatch(openNotification());
		axios.post('/projects/add',payload)
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
		type: types.ADD_PROJECT_REQUEST
	}
}

export function addProjectSuccess(project){
	return {
		type: types.ADD_PROJECT_SUCCESS,
		payload: project
	}
}

export function addProjectFailure(err){
	return {
		type: types.ADD_PROJECT_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function editProject(payload){
	return function(dispatch){

		dispatch(editProjectRequest());
		axios.post('/projects/edit', payload)
			.then(function(res){
				dispatch(editProjectSuccess(res.data.project));
			})
			.catch(function(err){
				dispatch(editProjectFailure(err));
			})

	}
}

export function editProjectRequest(){
	return {
		type: types.EDIT_PROJECT_REQUEST
	}
}

export function editProjectSuccess(project){
	return {
		type: types.EDIT_PROJECT_SUCCESS,
		payload: project
	}
}

export function editProjectFailure(err){
	return {
		type: types.EDIT_PROJECT_FAILURE,
		payload: err
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
		type: types.FETCH_PROJECT_REQUEST
	}
}

export function fetchProjectSuccess(projects){
	return {
		type: types.FETCH_PROJECT_SUCCESS,
		payload: projects
	}
}

export function fetchProjectFailure(err){
	return {
		type: types.FETCH_PROJECT_FAILURE,
		payload: {
			errors: err
		}
	}
}


export function deleteProject(projectId){
	return function(dispatch){
		dispatch(deleteProjectRequest());
		axios.delete('/projects/delete', {
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
		type: types.DELETE_PROJECT_REQUEST
	}
}

export function deleteProjectSuccess(projectId){
	return {
		type: types.DELETE_PROJECT_SUCCESS,
		payload: projectId
	}
}

export function deleteProjectFailure(err){
	return {
		type: types.DELETE_PROJECT_FAILURE,
		payload: err
	}
}


export function getEditingProject(project){
	return {
		type: types.GET_EDITING_PROJECT,
		payload: project
	}
}

export function removeEditingProject(){
	return {
		type: types.REMOVE_EDITING_PROJECT
	}
}
