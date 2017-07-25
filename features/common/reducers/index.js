import * as types from '../constants';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	projectUsers: [],
	projectTags: [],
	loading: false,
	commonInfoText: '',
	publicMsg: {},
	showNotification: false,
	onlineUserlist: {},
	updatedUser: null
}

export default function common(state=initialState, action){
	switch(action.type){
		case types.FETCH_USERS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'fetching users...'
			});
		case types.FETCH_USERS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectUsers: action.payload
			});
		case types.FETCH_USERS_FAILURE:
			return Object.assign({}, state, {
				projectUsers: [],
				commonInfoText: action.payload.errors
			});

		case types.FETCH_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'fetching tags...'
			});
		case types.FETCH_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: action.payload
			});
		case types.FETCH_TAGS_FAILURE:
			return Object.assign({}, state, {
				projectTags: [],
				commonInfoText: action.payload.errors
			});

		case types.SAVE_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'saving tag...'
			});
		case types.SAVE_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: addNewItemToArrayBegin(state.projectTags, action.payload)
			});
		case types.SAVE_TAGS_FAILURE:
			return Object.assign({}, state, {
				commonInfoText: action.payload.errors
			});
		
		case types.OPEN_NOTIFICATION:
			return Object.assign({}, state, {
				showNotification: true
			});

		case types.CLOSE_NOTIFICATION:
			return Object.assign({}, state, {
				showNotification: false,
				publicMsg: {}
			});

		case types.SEARCH_INPUT_REQUEST: 
			return Object.assign({}, state, {
				publicMsg: {}
			});
		case types.SEARCH_INPUT_FAILURE:
			return Object.assign({}, state, {
				publicMsg: {
					message: '查找不到您输入的内容，请重新输入。',
					level: 'error'
				}
			});		



		default:
			return state;
	}
}

