import { 
	FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
	FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE,
	SAVE_TAGS_REQUEST, SAVE_TAGS_SUCCESS, SAVE_TAGS_FAILURE 
} from '../actions';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	projectUsers: [],
	projectTags: [],
	loading: false,
	infoText: ''
}

export default function common(state=initialState, action){
	switch(action.type){
		case FETCH_USERS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				infoText: 'fetching users...'
			});
		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectUsers: action.payload
			});
		case FETCH_USERS_FAILURE:
			return Object.assign({}, state, {
				projectUsers: [],
				infoText: action.payload.errors
			});

		case FETCH_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				infoText: 'fetching tags...'
			});
		case FETCH_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: action.payload
			});
		case FETCH_TAGS_FAILURE:
			return Object.assign({}, state, {
				projectTags: [],
				infoText: action.payload.errors
			});

		case SAVE_TAGS_REQUEST:
			return Object.assign({}, state, {
				loading: true,
				infoText: 'saving tag...'
			});
		case SAVE_TAGS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				projectTags: addNewItemToArrayBegin(state.projectTags, action.payload)
			});
		case SAVE_TAGS_FAILURE:
			return Object.assign({}, state, {
				infoText: action.payload.errors
			});
		
		default:
			return state;
	}
}

