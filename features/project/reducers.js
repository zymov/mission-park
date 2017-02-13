
import { FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from './actions';

const initialState = {
	isFetching: false,
	projects: null,
	errors: null
}

export default function project(state = initialState, action){

	switch (action.type) {
		case FETCH_PROJECT_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				projects: action.payload
			})
		case FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				errors: action.payload.errors
			})
		default:
			return state;
	}

}