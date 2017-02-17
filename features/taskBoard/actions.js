import axios from 'axios';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const ADD_TASK_LIST_REQUEST = 'ADD_TASK_LIST_REQUEST';
export const ADD_TASK_LIST_SUCCESS = 'ADD_TASK_LIST_SUCCESS';
export const ADD_TASK_LIST_FAILURE = 'ADD_TASK_LIST_FAILURE';

export function addTaskList(tasklistName){
	return function(dispatch){

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