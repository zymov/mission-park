import axios from 'axios';
import { fetchTasks } from './taskActions';

export const ADD_TASKLIST_REQUEST = 'ADD_TASKLIST_REQUEST';
export const ADD_TASKLIST_SUCCESS = 'ADD_TASKLIST_SUCCESS';
export const ADD_TASKLIST_FAILURE = 'ADD_TASKLIST_FAILURE';

export const FETCH_TASKLISTS_REQUEST = 'FETCH_TASKLISTS_REQUEST';
export const FETCH_TASKLISTS_SUCCESS = 'FETCH_TASKLISTS_SUCCESS';
export const FETCH_TASKLISTS_FAILURE = 'FETCH_TASKLISTS_FAILURE';

export const SET_CURRENT_TASKLIST_ID_TO_NULL = 'SET_CURRENT_TASKLIST_ID_TO_NULL';

export function addTasklist(payload){
	return function(dispatch){
		dispatch(addTasklistRequest());
		axios.post('/tasks/addtasklist', payload)
		.then(function(res){
			dispatch(addTasklistSuccess(res.data.tasklist));
		})
		.catch(function(err){
			dispatch(addTasklistFailure(err));
		});
	}
}

export function addTasklistRequest(){
	return {
		type: 'ADD_TASKLIST_REQUEST'
	}
}

export function addTasklistSuccess(tasklist){
	return {
		type: 'ADD_TASKLIST_SUCCESS',
		payload: tasklist
	}
}

export function addTasklistFailure(err){
	return {
		type: 'ADD_TASKLIST_FAILURE',
		payload: {
			errors: err
		}
	}
}

export function fetchTasklists(projectId){
	return function(dispatch){
		dispatch(fetchTasklistsRequest());
		axios.get('/tasks/fetchtasklists', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch(fetchTasklistsSuccess(res.data.tasklists));
			res.data.tasklists[0] && dispatch(fetchTasks(res.data.tasklists[0]._id, 0, res.data.tasklists[0].tasklistName));

			//clear currentTasklistId from state tree to prevent project which has none tasklist 
			// from getting the previous [currentTasklistId] in state tree.
			res.data.tasklists.length == 0 && dispatch(setCurrentTasklistIdToNull());

		})
		.catch(function(err){
			dispatch(fetchTasklistsFailure(err));
		});
	}
}

export function fetchTasklistsRequest(){
	return {
		type: 'FETCH_TASKLISTS_REQUEST'
	}
}

export function fetchTasklistsSuccess(tasklists){
	return {
		type: 'FETCH_TASKLISTS_SUCCESS',
		payload: tasklists
	}
}

export function fetchTasklistsFailure(err){
	return {
		type: 'FETCH_TASKLISTS_FAILURE',
		payload: {
			errors: err
		}
	}
}

export function setCurrentTasklistIdToNull(){
	return {
		type: 'SET_CURRENT_TASKLIST_ID_TO_NULL'
	}
}