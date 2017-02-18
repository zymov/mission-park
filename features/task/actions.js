import axios from 'axios';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const ADD_TASKLIST_REQUEST = 'ADD_TASKLIST_REQUEST';
export const ADD_TASKLIST_SUCCESS = 'ADD_TASKLIST_SUCCESS';
export const ADD_TASKLIST_FAILURE = 'ADD_TASKLIST_FAILURE';

export const FETCH_TASKLIST_REQUEST = 'FETCH_TASKLIST_REQUEST';
export const FETCH_TASKLIST_SUCCESS = 'FETCH_TASKLIST_SUCCESS';
export const FETCH_TASKLIST_FAILURE = 'FETCH_TASKLIST_FAILURE';


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
			projectId: projectId
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

export function addTask(taskName){
	return function(dispatch){
		axios.post('/tasks/addtask', {
			taskName: taskName
		})
		.then(function(res){
			console.log(res.data.message);

		})
		.catch(function(error){
			console.log(error);
		});
	}
}