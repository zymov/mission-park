import { 
	FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
	FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE 
} from '../actions';

const initialState = {
	projectUsers: [],
	allTags: [],
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
				allTags: action.payload
			});
		case FETCH_TAGS_FAILURE:
			return Object.assign({}, state, {
				allTags: [],
				infoText: action.payload.errors
			});
		default:
			return state;
	}
}

