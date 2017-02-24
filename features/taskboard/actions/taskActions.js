import axios from 'axios';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const SET_CURRENT_TASKLIST_ID = 'SET_CURRENT_TASKLIST_ID';
export const NULL_TASKLIST_ID = 'NULL_TASKLIST_ID';

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
export function fetchTask(tasklistId){
	if(!tasklistId) return {
		type: 'NULL_TASKLIST_ID'
	};
	return function(dispatch){
		dispatch(setCurrentTasklistId(tasklistId));
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

export function setCurrentTasklistId(tasklistId){
	return {
		type: 'SET_CURRENT_TASKLIST_ID',
		payload: tasklistId
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
