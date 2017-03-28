import { 
	FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
	FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	SAVE_TAGS_REQUEST, SAVE_TAGS_SUCCESS, SAVE_TAGS_FAILURE,
	OPEN_NOTIFICATION, CLOSE_NOTIFICATION, 
	SEARCH_INPUT_REQUEST, SEARCH_INPUT_FAILURE 
} from '../actions';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	projectUsers: [],
	projectTags: [],
	loading: false,
	commonInfoText: '',
	publicMsg: {},
	showNotification: false
}

export default function common(state=initialState, action){
	switch(action.type){
		case FETCH_USERS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'fetching users...'
			});
		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectUsers: action.payload
			});
		case FETCH_USERS_FAILURE:
			return Object.assign({}, state, {
				projectUsers: [],
				commonInfoText: action.payload.errors
			});

		case FETCH_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'fetching tags...'
			});
		case FETCH_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: action.payload
			});
		case FETCH_TAGS_FAILURE:
			return Object.assign({}, state, {
				projectTags: [],
				commonInfoText: action.payload.errors
			});

		case SAVE_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				commonInfoText: 'saving tag...'
			});
		case SAVE_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: addNewItemToArrayBegin(state.projectTags, action.payload)
			});
		case SAVE_TAGS_FAILURE:
			return Object.assign({}, state, {
				commonInfoText: action.payload.errors
			});
		
		case OPEN_NOTIFICATION:
			return Object.assign({}, state, {
				showNotification: true
			});

		case CLOSE_NOTIFICATION:
			return Object.assign({}, state, {
				showNotification: false,
				publicMsg: {}
			});

		case SEARCH_INPUT_REQUEST: 
			return Object.assign({}, state, {
				publicMsg: {}
			});
		case SEARCH_INPUT_FAILURE:
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

