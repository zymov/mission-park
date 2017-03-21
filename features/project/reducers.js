import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from './actions';
import { addNewItemToArrayBegin } from '../../utils';

const initialState = {
	isLoading: false,
	projects: [],
	newProject: null,
	fetchSuccess: false,
	isError: false,
	infoText: {}
}

export default function project(state = initialState, action){

	switch (action.type) {
		case FETCH_PROJECT_REQUEST:
			return Object.assign({}, state, {
				isLoading: true,
				projects: [],
				infoText: {
					message: '正在加载...',
					level: 'normal'
				}
			});
		case FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				projects: action.payload,
				infoText: {}
			})
		case FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				projects: [],
				infoText: {
					message: '错误：' + action.payload.errors,
					level: 'error'
				}
			})
		case ADD_PROJECT_REQUEST: 
			return Object.assign({}, state, {
				isLoading: true,
				newProject: null,
				infoText: {
					message: '正在添加...',
					level: 'normal'
				}
			})
		case ADD_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				newProject: action.payload,
				projects: addNewItemToArrayBegin(state.projects, action.payload),
				infoText: {
					message: '添加成功！',
					level: 'success'
				}
			})
		case ADD_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isError: true,
				newProject: null,
				infoText: {
					message: '错误：' + action.payload.errors,
					level: 'error'
				} 
			})
		default:
			return state;
	}

}