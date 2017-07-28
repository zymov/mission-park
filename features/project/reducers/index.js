import * as types from '../constants';
import { UPDATE_PROJECT_ARR } from '../../common/constants';
import { addNewItemToArrayBegin, updateItemInArray, removeSpecificItemByAttrValue } from '../../../utils';

const initialState = {
	isLoading: false,
	projects: [],
	newProject: null,
	fetchSuccess: false,
	editingProject: null, 
	isError: false,
	infoText: {}
}

export default function project(state = initialState, action){

	switch (action.type) {
		case types.FETCH_PROJECT_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				projects: [],
				infoText: {
					message: '正在加载...',
					level: 'normal'
				}
			});
		case types.FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				infoText: {},
				isLoading: false,
				projects: action.payload
			});
		case types.FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				projects: [],
				infoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				}
			});
		case types.ADD_PROJECT_REQUEST: 
			return Object.assign({}, state, {
				isLoading: true,
				newProject: null,
				infoText: {
					message: '正在添加...',
					level: 'normal'
				}
			});
		case types.ADD_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				newProject: action.payload,
				projects: addNewItemToArrayBegin(state.projects, action.payload),
				infoText: {
					message: '添加成功！',
					level: 'success'
				}
			});
		case types.ADD_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				newProject: null,
				infoText: {
					message: '出错了！' + action.payload.errors,
					level: 'error'
				} 
			});

		case UPDATE_PROJECT_ARR:
			return Object.assign({}, state, {
				projects: action.payload
			});


		case types.DELETE_PROJECT_REQUEST:
			return Object.assign({}, state, {
				infoText: {
					message: '正在删除...',
					level: 'normal'
				}
			});
		case types.DELETE_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				infoText: {
					message: '删除成功！',
					level: 'success'
				},
				projects: removeSpecificItemByAttrValue(state.projects, '_id', action.payload)	
			});
		case types.DELETE_PROJECT_FAILURE:
			return Object.assign({}, state, {
				infoText: {
					message: '删除失败！',
					level: 'error'
				}
			});

		case types.GET_EDITING_PROJECT:
			return Object.assign({}, state, {
				editingProject: action.payload
			});
		case types.REMOVE_EDITING_PROJECT:
			return Object.assign({}, state, {
				editingProject: null
			});

		case types.EDIT_PROJECT_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				infoText: {
					message: '正在保存...',
					level: 'normal'
				}
			});
		case types.EDIT_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				editingProject: null,
				projects: updateItemInArray(state.projects, action.payload, '_id'),
				infoText: {
					message: '保存成功！',
					level: 'success'
				}
			});
		case types.EDIT_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				editingProject: null,
				infoText: {
					message: '出错了！' + action.payload,
					level: 'error'
				} 
			});

		default:
			return state;
	}

}