
import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from './actions';

const initialState = {
	fetchingProject: false,
	addingProject: false,
	projects: null,
	newProject: null,
	fetchingErrors: null,
	addingProjectErrors: null
}

export default function project(state = initialState, action){

	switch (action.type) {
		case FETCH_PROJECT_REQUEST:
			return Object.assign({}, state, {
				fetchingProject: true
			});
		case FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				fetchingProject: false,
				projects: action.payload
			})
		case FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				fetchingProject: false,
				fetchingErrors: action.payload.errors
			})
		case ADD_PROJECT_REQUEST: 
			return Object.assign({}, state, {
				addingProject: true
			})
		case ADD_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				addingProject: false,
				newProject: action.payload
			})
		case ADD_PROJECT_FAILURE:
			return Object.assign({}, state, {
				addingProject: false,
				addingProjectErrors: action.payload.errors
			})
		default:
			return state;
	}

}