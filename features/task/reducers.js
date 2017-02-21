import { ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, ADD_TASKLIST_REQUEST, ADD_TASKLIST_SUCCESS, ADD_TASKLIST_FAILURE, FETCH_TASKLIST_REQUEST, FETCH_TASKLIST_SUCCESS, FETCH_TASKLIST_FAILURE } from './actions';

import { addNewObjectToList } from '../../utils';

const initialState = {
	// fetchingTasklist: false,
	// addingTasklist: false,
	// addingTask: false,
	isLoading: false,

	tasklists: null,
	newTasklist: null,
	newTask: null,

	// addingTasklistErrors: null,
	// addingTaskErrors: null,
	// fetchingTasklistErrors: null,
	isError: false,

	infoText: ''
}

export default function task(state = initialState, action){
	switch(action.type){
		case ADD_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				infoText: 'adding task list...'
			});
		case ADD_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				newTasklist: action.payload,
				tasklists: addNewObjectToList(state.tasklists, action.payload),
				infoText: ''
			});
		case ADD_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				infoText: 'Error:' + action.payload.errors
			});

		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				infoText: 'adding task...'
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				newTask: action.payload,
				infoText: ''
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				infoText: 'Error:' + action.payload.errors
			});

		case FETCH_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				infoText: 'fetching task list...'
			});
		case FETCH_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				tasklists: action.payload,
				infoText: ''
			});
		case FETCH_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				infoText: 'Error:' + action.payload.errors
			});
		default:
			return state;
	}
}