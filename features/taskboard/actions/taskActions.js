import axios from 'axios';
import { openNotification } from '../../common/actions';
import { deepCloneObject } from '../../../utils';
import * as types from '../constants/taskActionTypes';

// export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
// export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
// export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

// export const CHANGE_TASK_SUM_SUCCESS = 'CHANGE_TASK_SUM_SUCCESS';
// export const CHANGE_TASK_SUM_FAILURE = 'CHANGE_TASK_SUM_FAILURE';

// export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
// export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
// export const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';

// export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
// export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
// export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// export const SET_CURRENT_TASKLIST = 'SET_CURRENT_TASKLIST';
// export const NULL_TASKLIST_ID = 'NULL_TASKLIST_ID';

// export const OPEN_USERS_DROPDOWN = 'OPEN_USERS_DROPDOWN';
// export const CLOSE_USERS_DROPDOWN = 'CLOSE_USERS_DROPDOWN';

// export const OPEN_TAGS_DROPDOWN = 'OPEN_TAGS_DROPDOWN';
// export const CLOSE_TAGS_DROPDOWN = 'CLOSE_TAGS_DROPDOWN';

// export const ADD_EXECUTOR = 'ADD_EXECUTOR';
// export const REMOVE_EXECUTOR = 'REMOVE_EXECUTOR';
// export const REMOVE_ALL_EXECUTOR = 'REMOVE_ALL_EXECUTOR';

// export const ADD_TAG = 'ADD_TAG';
// export const REMOVE_TAG = 'REMOVE_TAG';
// export const REMOVE_ALL_TAG = 'REMOVE_ALL_TAG';

// export const TOGGLE_TASK_REQUEST = 'TOGGLE_TASK_REQUEST';
// export const TOGGLE_TASK_SUCCESS = 'TOGGLE_TASK_SUCCESS';
// export const TOGGLE_TASK_FAILURE = 'TOGGLE_TASK_FAILURE';
// export const ADD_ACCOMPLISHED_TASK_REQUEST = 'ADD_ACCOMPLISHED_TASK_REQUEST';
// export const ADD_ACCOMPLISHED_TASK_SUCCESS = 'ADD_ACCOMPLISHED_TASK_SUCCESS';
// export const ADD_ACCOMPLISHED_TASK_FAILURE = 'ADD_ACCOMPLISHED_TASK_FAILURE';

// export const SHOW_TASK_DETAIL = 'SHOW_TASK_DETAIL';

// export const INVALID_INPUT = 'INVALID_INPUT';
// export const INVALID_INPUT_MAX_LENGTH = 'INVALID_INPUT_MAX_LENGTH';

// export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
// export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
// export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

// export const SET_SELECTED_PRIORITY = 'SET_SELECTED_PRIORITY';

/* add and edit tasks */
export function addTask(payload){
	return function(dispatch){
		dispatch(addTaskRequest());
		dispatch(openNotification());
		axios.post('/tasks/addtask', payload)
		.then(function(res){
			socket.emit('add task', {task: res.data.task, room: payload.projectId});
			dispatch(addTaskSuccess(res.data.task));
		})
		.catch(function(err){
			dispatch(addTaskFailure(err));
		});

		axios.post('/tasks/changetasksum', {add: 1, tasklistId: payload.tasklistId})
		.then(function(res){
			socket.emit('change task sum', {tasklist: res.data.tasklist, room: payload.projectId});
			dispatch(changeTaskSumSuccess(res.data.tasklist));
		})
		.catch(function(err){
			dispatch(changeTaskSumFailure(err));
		});
	}
}

export function addTaskRequest(){
	return {
		type: types.ADD_TASK_REQUEST
	}
}

export function addTaskSuccess(task){
	return {
		type: types.ADD_TASK_SUCCESS,
		payload: task
	}
}

export function addTaskFailure(err){
	return {
		type: types.ADD_TASK_FAILURE,
		payload: {
			errors: err
		}
	}
}


export function changeTaskSumSuccess(tasklist){
	return {
		type: types.CHANGE_TASK_SUM_SUCCESS,
		payload: tasklist
	}
}

export function changeTaskSumFailure(err){
	return {
		type: types.CHANGE_TASK_SUM_FAILURE,
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
			socket.emit('edit task', { task: res.data.task, room: payload.projectId});
			dispatch(editTaskSuccess(res.data.task));
		})
		.catch(function(err){
			dispatch(editTaskFailure(err));
		});
	}
}

export function editTaskRequest(){
	return {
		type: types.EDIT_TASK_REQUEST
	}
}

export function editTaskSuccess(task){
	return {
		type: types.EDIT_TASK_SUCCESS,
		payload: task
	}
}

export function editTaskFailure(err){
	return {
		type: types.EDIT_TASK_FAILURE,
		payload: {
			errors: err
		}
	}
}

/* fetch tasks by tasklistId */
export function fetchTasks(tasklistId, index, tasklistName){
	if(!tasklistId) return {
		type: types.NULL_TASKLIST_ID
	};
	return function(dispatch){
		dispatch(setCurrentTasklist(tasklistId, index, tasklistName));
		dispatch(setSelectedPriority(null));
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
		type: types.SET_CURRENT_TASKLIST,
		payload: {
			tasklistId: tasklistId,
			index: index,
			tasklistName: tasklistName
		}
	}
}

export function fetchTasksRequest(){
	return {
		type: types.FETCH_TASKS_REQUEST
	}
}

export function fetchTasksSuccess(tasks){
	return {
		type: types.FETCH_TASKS_SUCCESS,
		payload: tasks
	}
}

export function fetchTasksFailure(err){
	return {
		type: types.FETCH_TASKS_FAILURE,
		payload: {
			errors: err
		}
	}
}

/* get executor dropdown */

export function openUsersDropdown(){
	return {
		type: types.OPEN_USERS_DROPDOWN
	}
}

export function closeUsersDropdown(){
	return {
		type: types.CLOSE_USERS_DROPDOWN
	}
}

export function openTagsDropdown(){
	return {
		type: types.OPEN_TAGS_DROPDOWN
	}
}

export function closeTagsDropdown(){
	return {
		type: types.CLOSE_TAGS_DROPDOWN
	}
}


/* dropdown list click event */
export function addExecutor(user){
	return {
		type: types.ADD_EXECUTOR,
		payload: user
	}
}

export function removeExecutor(user){
	return {
		type: types.REMOVE_EXECUTOR,
		payload: user
	}
}

export function removeAllExecutor(){
	return {
		type: types.REMOVE_ALL_EXECUTOR
	}
}

export function addTag(tagName){
	return {
		type: types.ADD_TAG,
		payload: tagName
	}
}

export function removeTag(tagName){
	return {
		type: types.REMOVE_TAG,
		payload: tagName
	}
}

export function removeAllTag(){
	return {
		type: types.REMOVE_ALL_TAG
	}
}


/* toggle task accomplishment or change task due date*/
export function toggleTask(task, projectId){
	return function(dispatch){
		dispatch(toggleTaskRequest());
		dispatch(openNotification());
		axios.post('/tasks/toggletask', {
			task: task
		})
		.then(function(res){
			socket.emit('toggle task', {task: res.data.updatedTask, room: projectId});
			dispatch(toggleTaskSuccess(res.data.updatedTask));
			if(res.data.updatedTask.repeat){
				let task = deepCloneObject(res.data.updatedTask);
				task.repeat = 0;
				task.dueDate = null;
				task.accomplished = true;
				delete task._id;
				dispatch(addAccomplishedTaskRequest());
				axios.post('/tasks/addtask', task)
				.then(function(res){
					socket.emit('add accomplished task', {task: res.data.task, room: projectId});
					dispatch(addAccomplishedTaskSuccess(res.data.task));
				})
				.catch(function(err){
					dispatch(addAccomplishedTaskFailure(err));
				});

				axios.post('/tasks/changetasksum', {add: 1, tasklistId: task._tasklistId})
				.then(function(res){
					socket.emit('change task sum', {tasklist: res.data.tasklist, room: projectId});
					dispatch(changeTaskSumSuccess(res.data.tasklist));
				})
				.catch(function(err){
					dispatch(changeTaskSumFailure(err));
				});

			}
		})
		.catch(function(err){
			dispatch(toggleTaskFailure(err));
		})
	}
}

export function toggleTaskRequest(){
	return {
		type: types.TOGGLE_TASK_REQUEST
	}
}

export function addAccomplishedTaskRequest(){
	return {
		type: types.ADD_ACCOMPLISHED_TASK_REQUEST
	}
}

export function addAccomplishedTaskSuccess(task){
	return {
		type: types.ADD_ACCOMPLISHED_TASK_SUCCESS,
		payload: task
	}
}

export function addAccomplishedTaskFailure(err){
	return {
		type: types.ADD_ACCOMPLISHED_TASK_FAILURE,
		payload: {
			errors: err
		}
	}
}

export function toggleTaskSuccess(task){
	return {
		type: types.TOGGLE_TASK_SUCCESS,
		payload: task
	}
}

export function toggleTaskFailure(err){
	return {
		type: types.TOGGLE_TASK_FAILURE,
		payload: {
			errors: err
		}
	}
}

/* show task detail */		
export function showTaskDetail(task){	// need to be fetched from database to avoid mistakes?
	return {
		type: types.SHOW_TASK_DETAIL,
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
		type: types.INVALID_INPUT
	}	
}

export function invalidInputMaxLength(payload){
	return {
		type: types.INVALID_INPUT_MAX_LENGTH,
		payload: payload
	}
}


export function deleteTask(taskId, tasklistId, projectId){
	return function(dispatch){
		dispatch(deleteTaskRequest());
		dispatch(openNotification());
		axios.delete('/tasks/deletetask', {
			params: {
				taskId: taskId
			}
		})
		.then(function(res){
			socket.emit('delete task', {taskId: res.data.taskId, room: projectId});
			dispatch(deleteTaskSuccess(res.data.taskId));
		})
		.catch(function(err){
			dispatch(deleteTaskFailure(err));
		});

		axios.post('/tasks/changetasksum', {add: -1, tasklistId: tasklistId})
		.then(function(res){
			socket.emit('change task sum', {tasklist: res.data.tasklist, room: projectId});
			dispatch(changeTaskSumSuccess(res.data.tasklist));
		})
		.catch(function(err){
			dispatch(changeTaskSumFailure(err));
		});
	}
}

export function deleteTaskRequest(){
	return {
		type: types.DELETE_TASK_REQUEST
	}
}

export function deleteTaskSuccess(taskId){
	return {
		type: types.DELETE_TASK_SUCCESS,
		payload: taskId
	}
}

export function deleteTaskFailure(err){
	return {
		type: types.DELETE_TASK_FAILURE
	}
}


export function setSelectedPriority(priority){
	return {
		type: types.SET_SELECTED_PRIORITY,
		payload: priority
	}
}