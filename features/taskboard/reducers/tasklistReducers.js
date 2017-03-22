import { 
	ADD_TASKLIST_REQUEST, ADD_TASKLIST_SUCCESS, ADD_TASKLIST_FAILURE,
	FETCH_TASKLISTS_REQUEST, FETCH_TASKLISTS_SUCCESS, FETCH_TASKLISTS_FAILURE } from '../actions/tasklistActions';
import { FETCH_TASKS_REQUEST } from '../actions/taskActions';

import { addNewItemToArrayBegin } from '../../../utils';

const initialState = {
	tasklistLoading: false,

	tasklists: [],
	newTasklist: null,

	tasklistError: false,

	tasklistInfoText: {}
}

export default function tasklist(state = initialState, action){
	switch(action.type){
		case ADD_TASKLIST_REQUEST:
			return Object.assign({}, state, {
				tasklistLoading: true,
				tasklistInfoText: {
					message: '正在添加...',
					level: 'normal'
				}
			});
		case ADD_TASKLIST_SUCCESS:
			return Object.assign({}, state, {
				tasklistLoading: false,
				newTasklist: action.payload,
				tasklists: addNewItemToArrayBegin(state.tasklists, action.payload),
				tasklistInfoText: {
					message: '添加成功！',
					level: 'success'
				}
			});
		case ADD_TASKLIST_FAILURE:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklistError: true,
				newTasklist: null,
				tasklistInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		case FETCH_TASKLISTS_REQUEST:
			return Object.assign({}, state, {
				tasklistLoading: true,
				tasklistInfoText: {
					message: '正在加载...',
					level: 'normal'
				}
			});
		case FETCH_TASKLISTS_SUCCESS:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklists: action.payload,
				tasklistInfoText: {}
			});
		case FETCH_TASKLISTS_FAILURE:
			return Object.assign({}, state, {
				tasklistLoading: false,
				tasklistError: true,
				tasklists: [],
				tasklistInfoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});

		case FETCH_TASKS_REQUEST:
			return Object.assign({}, state, {
				tasklistInfoText: {}
			});

		default:
			return state;
	}
}