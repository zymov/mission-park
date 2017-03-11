import { 
	ADD_TASKLIST_REQUEST, ADD_TASKLIST_SUCCESS, ADD_TASKLIST_FAILURE,
	FETCH_TASKLIST_REQUEST, FETCH_TASKLIST_SUCCESS, FETCH_TASKLIST_FAILURE } from '../actions/tasklistActions';

import { addNewItemToArrayBegin } from '../../../utils';

const initialState = {
	tasklistLoading: false,

	tasklists: [],
	newTasklist: null,

	tasklistError: false,

	tasklistInfoText: ''
}

export default function tasklist(state = initialState, action){
	switch(action.type){
		case ADD_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				tasklistLoading: true,
				tasklistInfoText: 'adding task list...'
			});
		case ADD_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				tasklistLoading: false,
				newTasklist: action.payload,
				tasklists: addNewItemToArrayBegin(state.tasklists, action.payload),
				tasklistInfoText: ''
			});
		case ADD_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklistError: true,
				newTasklist: null,
				tasklistInfoText: 'Error:' + action.payload.errors
			});

		case FETCH_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				tasklistLoading: true,
				tasklistInfoText: 'fetching task list...'
			});
		case FETCH_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklists: action.payload,
				tasklistInfoText: ''
			});
		case FETCH_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklistError: true,
				tasklists: [],
				tasklistInfoText: 'Error:' + action.payload.errors
			});

		default:
			return state;
	}
}