import axios from 'axios';
import { fetchTasks } from './taskActions';
import { openNotification } from '../../common/actions';
import * as types from '../constants/tasklistActionTypes';

export function addTasklist(payload){
	return function(dispatch){
		dispatch(addTasklistRequest());
		dispatch(openNotification());
		axios.post('/tasks/addtasklist', payload)
		.then(function(res){
			socket.emit('add tasklist', {tasklist: res.data.tasklist});
			dispatch(addTasklistSuccess(res.data.tasklist));
		})
		.catch(function(err){
			dispatch(addTasklistFailure(err));
		});
	}
}

export function addTasklistRequest(){
	return {
		type: types.ADD_TASKLIST_REQUEST
	}
}

export function addTasklistSuccess(tasklist){
	return {
		type: types.ADD_TASKLIST_SUCCESS,
		payload: tasklist
	}
}

export function addTasklistFailure(err){
	return {
		type: types.ADD_TASKLIST_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function fetchTasklists(projectId){
	return function(dispatch){
		dispatch(fetchTasklistsRequest());
		dispatch(openNotification());
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
		type: types.FETCH_TASKLISTS_REQUEST
	}
}

export function fetchTasklistsSuccess(tasklists){
	return {
		type: types.FETCH_TASKLISTS_SUCCESS,
		payload: tasklists
	}
}

export function fetchTasklistsFailure(err){
	return {
		type: types.FETCH_TASKLISTS_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function setCurrentTasklistIdToNull(){
	return {
		type: types.SET_CURRENT_TASKLIST_ID_TO_NULL
	}
}


export function deleteTasklist(tasklistId, projectId){
	return function(dispatch){
		dispatch(deleteTasklistRequest());
		axios.delete('/tasks/deletetasklist', {
			params: {
				tasklistId: tasklistId
			}
		})
		.then(function(res){
			socket.emit('delete tasklist',{ tasklistId: res.data.tasklistId, room: projectId});
			dispatch(deleteTasklistSuccess(res.data.tasklistId));
		})
		.catch(function(err){
			dispatch(deleteTasklistFailure(err));
		});
	}
}

export function deleteTasklistRequest(){
	return {
		type: types.DELETE_TASKLIST_REQUEST
	}
}

export function deleteTasklistSuccess(tasklistId){
	return {
		type: types.DELETE_TASKLIST_SUCCESS,
		payload: tasklistId
	}
}

export function deleteTasklistFailure(err){
	return {
		type: types.DELETE_TASKLIST_FAILURE
	}
}

