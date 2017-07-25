// import { 
// 	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
// 	EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE, 
// 	FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, 
// 	SET_CURRENT_TASKLIST, NULL_TASKLIST_ID,
// 	OPEN_USERS_DROPDOWN, CLOSE_USERS_DROPDOWN, OPEN_TAGS_DROPDOWN, CLOSE_TAGS_DROPDOWN, 
// 	ADD_EXECUTOR, REMOVE_EXECUTOR, REMOVE_ALL_EXECUTOR, ADD_TAG, REMOVE_TAG, REMOVE_ALL_TAG, 
// 	TOGGLE_TASK_REQUEST, TOGGLE_TASK_SUCCESS, TOGGLE_TASK_FAILURE, 
// 	ADD_ACCOMPLISHED_TASK_SUCCESS, ADD_ACCOMPLISHED_TASK_FAILURE, 
// 	SHOW_TASK_DETAIL,
// 	INVALID_INPUT_MAX_LENGTH, INVALID_INPUT,
// 	DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE, 
// 	SET_SELECTED_PRIORITY
// } from '../actions/taskActions';
import * as types from '../constants/taskActionTypes';
// import { ADD_TASKLIST_REQUEST, SET_CURRENT_TASKLIST_ID_TO_NULL, DELETE_TASKLIST_SUCCESS } from '../actions/tasklistActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL, DELETE_TASKLIST_SUCCESS } from '../constants/tasklistActionTypes';
// import { UPDATE_TASK_ARR, CLOSE_NOTIFICATION } from '../../common/actions';
import { UPDATE_TASK_ARR, CLOSE_NOTIFICATION } from '../../common/constants';
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
	tags:[],

	// toggle task
	toggling: false,

	// show task detail
	editTaskTimestamp: null,
	taskDetail: null,
	selectedPriority: null

}

export default function task(state = initialState, action){
	switch(action.type){
		/* add task */
		case types.ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: {
					message: '正在添加...',
					level: 'normal'
				}
			});
		case types.ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				newTask: action.payload,
				tasks: addNewItemToArrayBegin(state.tasks, action.payload),
				taskInfoText: {
					message: '添加成功！',
					level: 'success'
				}
			});
		case types.ADD_TASK_FAILURE:
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
		case types.EDIT_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: {
					message: '正在保存...',
					level: 'normal'
				}
			});
		case types.EDIT_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: updateItemInArray(state.tasks, action.payload, '_id'),
				taskInfoText: {
					message: '保存成功！',
					level: 'success'
				}
			});
		case types.EDIT_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		/* fetch task */
		case types.FETCH_TASKS_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				tasks: [],
				taskInfoText: {
					message: '正在加载...',
					level: 'normal'
				}
			});
		case types.FETCH_TASKS_SUCCESS:
			return Object.assign({}, state, {
				taskInfoText: {},
				taskLoading: false,
				tasks: action.payload
			});
		case types.FETCH_TASKS_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				tasks: [],
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				} 
			});
		case types.SET_CURRENT_TASKLIST:
			return Object.assign({}, state, {
				currentTasklistId: action.payload.tasklistId,
				activeTasklist: action.payload.index,
				currentTasklistName: action.payload.tasklistName
			});
		case types.NULL_TASKLIST_ID:
			return Object.assign({}, state, {
				tasks: []
			});
		case SET_CURRENT_TASKLIST_ID_TO_NULL:
			return Object.assign({}, state, {
				currentTasklistId: null
			});

		/* users dropdown reducer */
		case types.OPEN_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: true
			});
		
		case types.CLOSE_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: false
			});
		case types.OPEN_TAGS_DROPDOWN:
			return Object.assign({}, state, {
				showTagsDropdown: true
			});
		
		case types.CLOSE_TAGS_DROPDOWN:
			return Object.assign({}, state, {
				showTagsDropdown: false
			});

		case types.ADD_EXECUTOR: 
			return Object.assign({}, state, {
				executors: addNewItemToArrayEnd(state.executors, action.payload)	// The concat method creates a new array instead of mutating the original array itself!!!
			});
		case types.REMOVE_EXECUTOR:
			return Object.assign({}, state, {
				executors: removeSpecificItemFromArray(state.executors, action.payload, '_id')
			});
		case types.REMOVE_ALL_EXECUTOR:
			return Object.assign({}, state, {
				executors: []
			});

		case types.ADD_TAG: 
			return Object.assign({}, state, {
				tags: addNewItemToArrayEnd(state.tags, action.payload)
			});
		case types.REMOVE_TAG:
			return Object.assign({}, state, {
				tags: removeSpecificItemFromArray(state.tags, action.payload)
			});
		case types.REMOVE_ALL_TAG:
			return Object.assign({}, state, {
				tags: []
			});

		/* toggle task */
		case types.TOGGLE_TASK_REQUEST:
			return Object.assign({}, state, {
				toggling: true
			});
		case types.TOGGLE_TASK_SUCCESS: 
			return Object.assign({}, state, {
				toggling: false,
				tasks: updateAndMoveItemInArray(state.tasks, action.payload)
			});
		case types.TOGGLE_TASK_FAILURE:
			return Object.assign({}, state, {
				toggling: false,
				taskError: true,
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		case types.ADD_ACCOMPLISHED_TASK_SUCCESS:
			return Object.assign({}, state, {
				tasks: addNewItemToArrayEnd(state.tasks, action.payload)
			});
		case types.ADD_ACCOMPLISHED_TASK_FAILURE:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});
		/* show task detail */
		case types.SHOW_TASK_DETAIL:
			return Object.assign({}, state, {
				editTaskTimestamp: Date.now(),
				taskDetail: action.payload,
				executors: action.payload.executors,
				tags: action.payload.tags
			});


		case types.INVALID_INPUT_MAX_LENGTH:
			return Object.assign({}, state, {
				taskInfoText: {
					message:'输入文本长度应小于' + action.payload,
					level: 'error'
				}
			});
		case types.INVALID_INPUT:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '无效的输入',
					level: 'error'
				}
			});

		case types.DELETE_TASK_REQUEST:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '正在删除...',
					level: 'normal'
				}
			});
		case types.DELETE_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '删除成功！',
					level: 'success'
				},
				tasks: removeSpecificItemByAttrValue(state.tasks, '_id', action.payload)
			});
		case types.DELETE_TASK_FAILURE:
			return Object.assign({}, state, {
				taskInfoText: {
					message: '删除失败！',
					level: 'error'
				}
			});
		case DELETE_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				tasks: []
			});

		case UPDATE_TASK_ARR:
			return Object.assign({}, state, {
				tasks: action.payload
			});

		case CLOSE_NOTIFICATION:
			return Object.assign({}, state, {
				taskInfoText: {}
			});

		case types.SET_SELECTED_PRIORITY:
			return Object.assign({}, state, {
				selectedPriority: action.payload
			});
		default:
			return state;
	}
}