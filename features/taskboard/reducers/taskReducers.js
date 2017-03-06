import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, 
	SET_CURRENT_TASKLIST, 
	NULL_TASKLIST_ID,
	OPEN_EXECUTOR_DROPDOWN, CLOSE_EXECUTOR_DROPDOWN, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE 
} from '../actions/taskActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL } from '../actions/tasklistActions';

import { addNewObjectToList } from '../../../utils';

const initialState = {
	taskLoading: false,
	tasks: [],
	newTask: null,
	taskError: false,
	taskInfoText: '',
	currentTasklistId: null,
	activeTasklist: 0,
	currentTasklistName: '',

	// executor dropdown state
	showExecutorDropdown: false,
	dropdownLoading: false,
	executors: [],
	dropdownError: false, 
	dropdownInfoText: ''
}

export default function task(state = initialState, action){
	switch(action.type){
		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'adding task...'
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				newTask: action.payload,
				tasks: addNewObjectToList(state.tasks, action.payload),
				taskInfoText: ''
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				newTask: null,
				taskInfoText: 'Error:' + action.payload.errors
			});

		case FETCH_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'fetching task ...'
			});
		case FETCH_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: action.payload,
				taskInfoText: ''
			});
		case FETCH_TASK_FAILURE:
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
		case OPEN_EXECUTOR_DROPDOWN:
			return Object.assign({}, state, {
				showExecutorDropdown: true
			});
		case FETCH_USERS_REQUEST:
			return Object.assign({}, state, {
				dropdownLoading: true,
				dropdownInfoText: 'fetching users...'
			});
		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, {
				dropdownLoading: false,
				executors: action.payload
			});
		case FETCH_USERS_FAILURE:
			return Object.assign({}, state, {
				executors: [],
				dropdownInfoText: action.payload.errors
			});
		case CLOSE_EXECUTOR_DROPDOWN:
			return Object.assign({}, state, {
				showExecutorDropdown: false
			})
		default:
			return state;
	}
}