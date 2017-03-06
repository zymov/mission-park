import axios from 'axios';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const SET_CURRENT_TASKLIST = 'SET_CURRENT_TASKLIST';
export const NULL_TASKLIST_ID = 'NULL_TASKLIST_ID';

export const OPEN_EXECUTOR_DROPDOWN = 'OPEN_EXECUTOR_DROPDOWN';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CLOSE_EXECUTOR_DROPDOWN = 'CLOSE_EXECUTOR_DROPDOWN';

export const REMOVE_EXECUTOR = 'REMOVE_EXECUTOR';
export const ADD_EXECUTOR = 'ADD_EXECUTOR';

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
export function getExecutorDropdown(projectId){
	return function(dispatch){
		dispatch( openExecutorDropdown() );
		fetchUsers(dispatch, projectId);
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

export function openExecutorDropdown(){
	return {
		type: 'OPEN_EXECUTOR_DROPDOWN'
	}
}

export function closeExecutorDropdown(){
	return {
		type: 'CLOSE_EXECUTOR_DROPDOWN'
	}
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

/* dropdown list click event */
export function changeExecutors(projectId){
	return function(dispatch){
		
	}
}