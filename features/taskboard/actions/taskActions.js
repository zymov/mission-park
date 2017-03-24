import axios from 'axios';
import { openNotification } from '../../common/actions';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const SET_CURRENT_TASKLIST = 'SET_CURRENT_TASKLIST';
export const NULL_TASKLIST_ID = 'NULL_TASKLIST_ID';

export const OPEN_USERS_DROPDOWN = 'OPEN_USERS_DROPDOWN';
export const CLOSE_USERS_DROPDOWN = 'CLOSE_USERS_DROPDOWN';

export const OPEN_TAGS_DROPDOWN = 'OPEN_TAGS_DROPDOWN';
export const CLOSE_TAGS_DROPDOWN = 'CLOSE_TAGS_DROPDOWN';

export const ADD_EXECUTOR = 'ADD_EXECUTOR';
export const REMOVE_EXECUTOR = 'REMOVE_EXECUTOR';
export const REMOVE_ALL_EXECUTOR = 'REMOVE_ALL_EXECUTOR';

export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const REMOVE_ALL_TAG = 'REMOVE_ALL_TAG';

export const TOGGLE_TASK_REQUEST = 'TOGGLE_TASK_REQUEST';
export const TOGGLE_TASK_SUCCESS = 'TOGGLE_TASK_SUCCESS';
export const TOGGLE_TASK_FAILURE = 'TOGGLE_TASK_FAILURE';

export const SHOW_TASK_DETAIL = 'SHOW_TASK_DETAIL';

export const INVALID_INPUT = 'INVALID_INPUT';
export const INVALID_INPUT_MAX_LENGTH = 'INVALID_INPUT_MAX_LENGTH';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';


/* add and edit tasks */
export function addTask(payload){
	return function(dispatch){
		dispatch(addTaskRequest());
		dispatch(openNotification());
		axios.post('/tasks/addtask', payload)
		.then(function(res){
			dispatch(addTaskSuccess(res.data.task));
			return res.data.task;
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

export function editTask(payload){
	return function(dispatch){
		dispatch(editTaskRequest());
		dispatch(openNotification());
		axios.post('/tasks/edittask', payload)
		.then(function(res){
			dispatch(editTaskSuccess(res.data.task));
		})
		.catch(function(err){
			dispatch(editTaskFailure(err));
		});
	}
}

export function editTaskRequest(){
	return {
		type: 'EDIT_TASK_REQUEST'
	}
}

export function editTaskSuccess(task){
	return {
		type: 'EDIT_TASK_SUCCESS',
		payload: task
	}
}

export function editTaskFailure(err){
	return {
		type: 'EDIT_TASK_FAILURE',
		payload: {
			errors: err
		}
	}
}

/* fetch tasks by tasklistId */
export function fetchTasks(tasklistId, index, tasklistName){
	if(!tasklistId) return {
		type: 'NULL_TASKLIST_ID'
	};
	return function(dispatch){
		dispatch(setCurrentTasklist(tasklistId, index, tasklistName));
		dispatch(fetchTasksRequest());
		dispatch(openNotification());
		axios.get('/tasks/fetchtasks', {
			params: {
				tasklistId: tasklistId
			}
		})
		.then(function(res){
			dispatch(fetchTasksSuccess(res.data.tasks));
		})
		.catch(function(err){
			dispatch(fetchTasksFailure(err));
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

export function fetchTasksRequest(){
	return {
		type: 'FETCH_TASKS_REQUEST'
	}
}

export function fetchTasksSuccess(tasks){
	return {
		type: 'FETCH_TASKS_SUCCESS',
		payload: tasks
	}
}

export function fetchTasksFailure(err){
	return {
		type: 'FETCH_TASKS_FAILURE',
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

export function openTagsDropdown(){
	return {
		type: 'OPEN_TAGS_DROPDOWN'
	}
}

export function closeTagsDropdown(){
	return {
		type: 'CLOSE_TAGS_DROPDOWN'
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

export function addTag(tagName){
	return {
		type: 'ADD_TAG',
		payload: tagName
	}
}

export function removeTag(tagName){
	return {
		type: 'REMOVE_TAG',
		payload: tagName
	}
}

export function removeAllTag(){
	return {
		type: 'REMOVE_ALL_TAG'
	}
}


/* toggle task accomplishment or change task due date*/
export function toggleTask(task){
	return function(dispatch){
		dispatch(toggleTaskRequest());
		dispatch(openNotification());
		axios.post('/tasks/toggletask', {
			task: task
		})
		.then(function(res){
			dispatch(toggleTaskSuccess(res.data.updatedTask));
		})
		.catch(function(err){
			dispatch(toggleTaskFailure(err));
		})
	}
}

export function toggleTaskRequest(){
	return {
		type: 'TOGGLE_TASK_REQUEST'
	}
}

export function toggleTaskSuccess(task){
	return {
		type: 'TOGGLE_TASK_SUCCESS',
		payload: task
	}
}

export function toggleTaskFailure(err){
	return {
		type: 'TOGGLE_TASK_FAILURE',
		payload: {
			errors: err
		}
	}
}

/* show task detail */		
export function showTaskDetail(task){	// need to be fetched from database to avoid mistakes?
	return {
		type: 'SHOW_TASK_DETAIL',
		payload: task
	}
}


export function invalidInput(errorObj){
	return function(dispatch){
		dispatch(openNotification());
		switch (errorObj.type) {
			case 'maxLength':
				dispatch(invalidInputMaxLength(errorObj.maxLength));
				break;
			default:
				dispatch(invalidInputDefault());
				break;
		}
	}
}

export function invalidInputDefault(){
	return {
		type: 'INVALID_INPUT'
	}	
}

export function invalidInputMaxLength(payload){
	return {
		type: 'INVALID_INPUT_MAX_LENGTH',
		payload: payload
	}
}


export function deleteTask(taskId){
	return function(dispatch){
		dispatch(deleteTaskRequest());
		axios.delete('/tasks/deletetask', {
			params: {
				taskId: taskId
			}
		})
		.then(function(res){
			dispatch(deleteTaskSuccess(res.data.taskId));
		})
		.catch(function(err){
			dispatch(deleteTaskFailure(err));
		});
	}
}

export function deleteTaskRequest(){
	return {
		type: 'DELETE_TASK_REQUEST'
	}
}

export function deleteTaskSuccess(taskId){
	return {
		type: 'DELETE_TASK_SUCCESS',
		payload: taskId
	}
}

export function deleteTaskFailure(err){
	return {
		type: 'DELETE_TASK_FAILURE'
	}
}
