import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE, 
	FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, 
	SET_CURRENT_TASKLIST, NULL_TASKLIST_ID,
	OPEN_USERS_DROPDOWN, CLOSE_USERS_DROPDOWN, OPEN_TAGS_DROPDOWN, CLOSE_TAGS_DROPDOWN, 
	ADD_EXECUTOR, REMOVE_EXECUTOR, REMOVE_ALL_EXECUTOR, ADD_TAG, REMOVE_TAG, REMOVE_ALL_TAG, 
	TOGGLE_TASK_REQUEST, TOGGLE_TASK_SUCCESS, TOGGLE_TASK_FAILURE, 
	SHOW_TASK_DETAIL,
	INVALID_INPUT_MAX_LENGTH, INVALID_INPUT,
	DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE
} from '../actions/taskActions';
import { ADD_TASKLIST_REQUEST } from '../actions/tasklistActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL } from '../actions/tasklistActions';

import { 
	addNewItemToArrayBegin, addNewItemToArrayEnd, 
	updateItemInArray, removeSpecificItemByAttrValue, removeSpecificItemFromArray, updateAndMoveItemInArray 
} from '../../../utils';

const initialState = {
	taskLoading: false,
	tasks: [],
	newTask: null,
	taskError: false,
	taskInfoText: {},
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
	taskDetail: null

}

export default function task(state = initialState, action){
	switch(action.type){
		/* add task */
		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: {
					message: '正在添加...',
					level: 'normal'
				}
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				newTask: action.payload,
				tasks: addNewItemToArrayBegin(state.tasks, action.payload),
				taskInfoText: {
					message: '添加成功！',
					level: 'success'
				}
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				newTask: null,
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});
			
		/* edit task */
		case EDIT_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: {
					message: '正在保存...',
					level: 'normal'
				}
			});
		case EDIT_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: updateItemInArray(state.tasks, action.payload),
				taskInfoText: {
					message: '保存成功！',
					level: 'success'
				}
			});
		case EDIT_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		/* fetch task */
		case FETCH_TASKS_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: {
					message: '正在加载...',
					level: 'normal'
				}
			});
		case FETCH_TASKS_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: action.payload,
				taskInfoText: {}
			});
		case FETCH_TASKS_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				tasks: [],
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				} 
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
				taskInfoText: {},
				showUsersDropdown: true
			});
		
		case CLOSE_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: false
			});
		case OPEN_TAGS_DROPDOWN:
			return Object.assign({}, state, {
				taskInfoText: {},
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
				selectedTags: removeSpecificItemFromArray(state.selectedTags, action.payload)
			});
		case REMOVE_ALL_TAG:
			return Object.assign({}, state, {
				selectedTags: []
			});

		/* toggle task */
		case TOGGLE_TASK_REQUEST:
			return Object.assign({}, state, {
				taskInfoText: {},
				toggling: true
			});
		case TOGGLE_TASK_SUCCESS: 
			return Object.assign({}, state, {
				toggling: false,
				tasks: updateAndMoveItemInArray(state.tasks, action.payload),
				taskInfoText: {}
			});
		case TOGGLE_TASK_FAILURE:
			return Object.assign({}, state, {
				toggling: false,
				taskError: true,
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		/* show task detail */
		case SHOW_TASK_DETAIL:
			return Object.assign({}, state, {
				editTaskTimestamp: Date.now(),
				taskDetail: action.payload,
				executors: action.payload.executors,
				selectedTags: action.payload.tags
			});


		case INVALID_INPUT_MAX_LENGTH:
			return Object.assign({}, state, {
				taskInfoText: {
					message:'输入文本长度应小于' + action.payload,
					level: 'error'
				}
			});
		case INVALID_INPUT:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '无效的输入',
					level: 'error'
				}
			});

		case ADD_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				taskInfoText: {}
			});


		case DELETE_TASK_REQUEST:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '正在删除...',
					level: 'normal'
				}
			});
		case DELETE_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '删除成功！',
					level: 'success'
				},
				tasks: removeSpecificItemByAttrValue(state.tasks, '_id', action.payload)
			});
		case DELETE_TASK_FAILURE:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '删除失败！',
					level: 'error'
				}
			});

		default:
			return state;
	}
}