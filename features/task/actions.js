import axios from 'axios';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const ADD_TASKLIST_REQUEST = 'ADD_TASKLIST_REQUEST';
export const ADD_TASKLIST_SUCCESS = 'ADD_TASKLIST_SUCCESS';
export const ADD_TASKLIST_FAILURE = 'ADD_TASKLIST_FAILURE';

export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const FETCH_TASKLIST_REQUEST = 'FETCH_TASKLIST_REQUEST';
export const FETCH_TASKLIST_SUCCESS = 'FETCH_TASKLIST_SUCCESS';
export const FETCH_TASKLIST_FAILURE = 'FETCH_TASKLIST_FAILURE';

export const SET_CURRENT_TASKLIST_ID = 'SET_CURRENT_TASKLIST_ID';

/* task */
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


/* tasklist */
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

export function fetchTasklist(projectId){
	return function(dispatch){
		dispatch(fetchTasklistRequest());
		axios.get('/tasks/fetchtasklist', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch(fetchTasklistSuccess(res.data.tasklists));
		})
		.catch(function(err){
			dispatch(fetchTasklistFailure(err));
		});
	}
}

export function fetchTasklistRequest(){
	return {
		type: 'FETCH_TASKLIST_REQUEST'
	}
}

export function fetchTasklistSuccess(tasklists){
	return {
		type: 'FETCH_TASKLIST_SUCCESS',
		payload: tasklists
	}
}

export function fetchTasklistFailure(err){
	return {
		type: 'FETCH_TASKLIST_FAILURE',
		payload: {
			errors: err
		}
	}
}