import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE, 
	FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, 
	SET_CURRENT_TASKLIST, NULL_TASKLIST_ID,
	OPEN_USERS_DROPDOWN, CLOSE_USERS_DROPDOWN, OPEN_TAGS_DROPDOWN, CLOSE_TAGS_DROPDOWN, 
	ADD_EXECUTOR, REMOVE_EXECUTOR, REMOVE_ALL_EXECUTOR, ADD_TAG, REMOVE_TAG, REMOVE_ALL_TAG, 
	TOGGLE_TASK_REQUEST, TOGGLE_TASK_SUCCESS, TOGGLE_TASK_FAILURE, 
	SHOW_TASK_DETAIL
} from '../actions/taskActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL } from '../actions/tasklistActions';

import { 
	addNewItemToArrayBegin, addNewItemToArrayEnd, 
	updateItemInArray, removeSpecificItemFromArray, updateAndMoveItemInArray 
} from '../../../utils';

const initialState = {
	taskLoading: false,
	tasks: [],
	newTask: null,
	taskError: false,
	taskInfoText: '',
	currentTasklistId: null,
	activeTasklist: 0,
	currentTasklistName: '',

	// users and tags dropdown state
	showUsersDropdown: false,
	executors: [],
	showTagsDropdown: false,
	selectedTags:[],

	// toggle task
	toggling: false,

	// show task detail
	editTaskTimestamp: null,
	taskDetail: null,

}

export default function task(state = initialState, action){
	switch(action.type){
		/* add task */
		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'adding task...'
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				newTask: action.payload,
				tasks: addNewItemToArrayBegin(state.tasks, action.payload),
				taskInfoText: ''
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				newTask: null,
				taskInfoText: 'Error:' + action.payload.errors
			});
			
		/* edit task */
		case EDIT_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'saving task...'
			});
		case EDIT_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: updateItemInArray(state.tasks, action.payload),
				taskInfoText: ''
			});
		case EDIT_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				taskInfoText: 'Error:' + action.payload.errors
			});

		/* fetch task */
		case FETCH_TASKS_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'fetching task ...'
			});
		case FETCH_TASKS_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: action.payload,
				taskInfoText: ''
			});
		case FETCH_TASKS_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				tasks: [],
				taskInfoText: 'Error:' + action.payload.errors
			});
		case SET_CURRENT_TASKLIST:
			return Object.assign({}, state, {
				currentTasklistId: action.payload.tasklistId,
				activeTasklist: action.payload.index,
				currentTasklistName: action.payload.tasklistName
			});
		case NULL_TASKLIST_ID:
			return Object.assign({}, state, {
				tasks: []
			});
		case SET_CURRENT_TASKLIST_ID_TO_NULL:
			return Object.assign({}, state, {
				currentTasklistId: null
			});

		/* users dropdown reducer */
		case OPEN_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: true
			});
		
		case CLOSE_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: false
			});
		case OPEN_TAGS_DROPDOWN:
			return Object.assign({}, state, {
				showTagsDropdown: true
			});
		
		case CLOSE_TAGS_DROPDOWN:
			return Object.assign({}, state, {
				showTagsDropdown: false
			});

		case ADD_EXECUTOR: 
			return Object.assign({}, state, {
				executors: addNewItemToArrayEnd(state.executors, action.payload)	// The concat method creates a new array instead of mutating the original array itself!!!
			});
		case REMOVE_EXECUTOR:
			return Object.assign({}, state, {
				executors: removeSpecificItemFromArray(state.executors, action.payload, '_id')
			});
		case REMOVE_ALL_EXECUTOR:
			return Object.assign({}, state, {
				executors: []
			});

		case ADD_TAG: 
			return Object.assign({}, state, {
				selectedTags: addNewItemToArrayEnd(state.selectedTags, action.payload)
			});
		case REMOVE_TAG:
			return Object.assign({}, state, {
				selectedTags: removeSpecificItemFromArray(state.selectedTags, action.payload, '_id')
			});
		case REMOVE_ALL_TAG:
			return Object.assign({}, state, {
				selectedTags: []
			});

		/* toggle task */
		case TOGGLE_TASK_REQUEST:
			return Object.assign({}, state, {
				toggling: true
			});
		case TOGGLE_TASK_SUCCESS: 
			return Object.assign({}, state, {
				toggling: false,
				tasks: updateAndMoveItemInArray(state.tasks, action.payload)
			});
		case TOGGLE_TASK_FAILURE:
			return Object.assign({}, state, {
				toggling: false,
				taskError: true,
				taskInfoText: 'Error:' + action.payload.errors
			});

		/* show task detail */
		case SHOW_TASK_DETAIL:
			return Object.assign({}, state, {
				editTaskTimestamp: Date.now(),
				taskDetail: action.payload,
				executors: action.payload.executors
			});
		default:
			return state;
	}
}