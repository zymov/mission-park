
import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from './actions';

const initialState = {
	isFetching: false,
	isAdding: false,
	projects: null,
	newProject: null,
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
		case ADD_PROJECT_REQUEST: 
			return Object.assign({}, state, {
				isAdding: true
			})
		case ADD_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				isAdding: false,
				newProject: action.payload
			})
		case ADD_PROJECT_FAILURE:
			return Object.assign({}, state, {
				isAdding: false,
				errors: action.payload.errors
			})
		default:
			return state;
	}

}