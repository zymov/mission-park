import axios from 'axios';
import { fetchUsers } from '../../common/actions';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const SET_CURRENT_TASKLIST = 'SET_CURRENT_TASKLIST';
export const NULL_TASKLIST_ID = 'NULL_TASKLIST_ID';

export const OPEN_USERS_DROPDOWN = 'OPEN_USERS_DROPDOWN';
export const CLOSE_USERS_DROPDOWN = 'CLOSE_USERS_DROPDOWN';

export const ADD_EXECUTOR = 'ADD_EXECUTOR';
export const REMOVE_EXECUTOR = 'REMOVE_EXECUTOR';
export const REMOVE_ALL_EXECUTOR = 'REMOVE_ALL_EXECUTOR';

/* add */
export function addTask(payload){
	return function(dispatch){
		dispatch(addTaskRequest());
		axios.post('/tasks/addtask', payload)
		.then(function(res){
			dispatch(addTaskSuccess(res.data.task));
		})
		.catch(function(err){
			dispatch(addTaskFailure(err));
		});
	}
}

export function addTaskRequest(){
	return {
		type: 'ADD_TASK_REQUEST'
	}
}

export function addTaskSuccess(task){
	return {
		type: 'ADD_TASK_SUCCESS',
		payload: task
	}
}

export function addTaskFailure(err){
	return {
		type: 'ADD_TASK_FAILURE',
		payload: {
			errors: err
		}
	}
}

/* fetch */
export function fetchTask(tasklistId, index, tasklistName){
	if(!tasklistId) return {
		type: 'NULL_TASKLIST_ID'
	};
	return function(dispatch){
		dispatch(setCurrentTasklist(tasklistId, index, tasklistName));
		dispatch(fetchTaskRequest());
		axios.get('/tasks/fetchtask', {
			params: {
				tasklistId: tasklistId
			}
		})
		.then(function(res){
			dispatch(fetchTaskSuccess(res.data.tasks));
		})
		.catch(function(err){
			dispatch(fetchTaskFailure(err));
		});
	}
}

export function setCurrentTasklist(tasklistId, index, tasklistName){
	return {
		type: 'SET_CURRENT_TASKLIST',
		payload: {
			tasklistId: tasklistId,
			index: index,
			tasklistName: tasklistName
		}
	}
}

export function fetchTaskRequest(){
	return {
		type: 'FETCH_TASK_REQUEST'
	}
}

export function fetchTaskSuccess(tasks){
	return {
		type: 'FETCH_TASK_SUCCESS',
		payload: tasks
	}
}

export function fetchTaskFailure(err){
	return {
		type: 'FETCH_TASK_FAILURE',
		payload: {
			errors: err
		}
	}
}

/* get executor dropdown */

export function openUsersDropdown(){
	return {
		type: 'OPEN_USERS_DROPDOWN'
	}
}

export function closeUsersDropdown(){
	return {
		type: 'CLOSE_USERS_DROPDOWN'
	}
}


/* dropdown list click event */
export function addExecutor(user){
	return {
		type: 'ADD_EXECUTOR',
		payload: user
	}
}

export function removeExecutor(user){
	return {
		type: 'REMOVE_EXECUTOR',
		payload: user
	}
}

export function removeAllExecutor(){
	return {
		type: 'REMOVE_ALL_EXECUTOR'
	}
}


/* accomplish task */
export function accomplishTask(task){
	if(task.repeat){
		accomplishRepeatTask(task);
	} else {
		accomplishSimpleTask(task);
	}
}

export function accomplishSimpleTask(task){
	return function(dispatch){
		
	}
}

export function accomplishRepeatTask(task){

}

export function accomplishTaskRequest(){
	return {
		type: 'ACCOMPLISH_TASK_REQUEST'
	}
}

export function accomplishTaskSuccess(task){
	return {
		type: 'ACCOMPLISH_TASK_SUCCESS',
		payload: task
	}
}

export function accomplishTaskFailure(err){
	return {
		type: 'ACCOMPLISH_TASK_FAILURE',
		payload: {
			errors: err
		}
	}
}