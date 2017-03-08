import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions';

const initialState = {
	projectUsers: [],
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
		default:
			return state;
	}
}

