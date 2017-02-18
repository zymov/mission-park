import { ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, ADD_TASKLIST_REQUEST, ADD_TASKLIST_SUCCESS, ADD_TASKLIST_FAILURE, FETCH_TASKLIST_REQUEST, FETCH_TASKLIST_SUCCESS, FETCH_TASKLIST_FAILURE } from './actions';

const initialState = {
	fetchingTasklist: false,
	addingTasklist: false,
	addingTask: false,

	tasklists: null,
	newTasklist: null,
	newTask: null,

	addingTasklistErrors: null,
	addingTaskErrors: null,
	fetchingTasklistErrors: null
}

export default function task(state = initialState, action){
	switch(action.type){
		case ADD_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				addingTasklist: true
			});
		case ADD_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				addingTasklist: false,
				newTasklist: action.payload
			});
		case ADD_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				addingTasklist: false,
				addingTasklistErrors: action.payload.errors
			});

		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				addingTask: true
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				addingTask: false,
				newTask: action.payload
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				addingTask: false,
				addingTaskErrors: action.payload.errors
			});

		case FETCH_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				fetchingTasklist: true
			});
		case FETCH_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				fetchingTasklist: false,
				tasklists: action.payload
			});
		case FETCH_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				fetchingTasklist: false,
				fetchingTasklistErrors: action.payload.errors
			});
		default:
			return state;
	}
}