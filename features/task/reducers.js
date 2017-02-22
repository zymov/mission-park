import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	ADD_TASKLIST_REQUEST, ADD_TASKLIST_SUCCESS, ADD_TASKLIST_FAILURE, 
	FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, 
	FETCH_TASKLIST_REQUEST, FETCH_TASKLIST_SUCCESS, FETCH_TASKLIST_FAILURE,
	SET_CURRENT_TASKLIST_ID 
} from './actions';

import { addNewObjectToList } from '../../utils';

const initialState = {
	isLoading: false,

	tasklists: [],
	tasks: [],
	newTasklist: null,
	newTask: null,

	isError: false,

	infoText: '',

	currentTasklistId: null
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
				newTasklist: null,
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
				tasks: addNewObjectToList(state.tasks, action.payload),
				infoText: ''
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				newTask: null,
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
				tasklists: [],
				infoText: 'Error:' + action.payload.errors
			});

		case FETCH_TASK_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				infoText: 'fetching task ...'
			});
		case FETCH_TASK_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				tasks: action.payload,
				infoText: ''
			});
		case FETCH_TASK_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				tasks: [],
				infoText: 'Error:' + action.payload.errors
			});
		case SET_CURRENT_TASKLIST_ID:
			return Object.assign({}, state, {
				currentTasklistId: action.payload
			})
		default:
			return state;
	}
}