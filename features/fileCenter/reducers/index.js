import { 
	UPDATE_UPLOAD_PROGRESS, ADD_UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, 
	FETCH_FILES_SUCCESS, FETCH_FILES_FAILURE, 
	DELETE_FILE_SUCCESS, DELETE_FILE_FAILURE 
} from '../actions';
import { addNewItemToArrayBegin, removeSpecificItemByAttrValue, updateItemInArray } from '../../../utils';

const initialState = {
	filelist: [],
	uploadFiles: []
}

export default function fileCenter(state = initialState, action){

	switch(action.type){

		case UPDATE_UPLOAD_PROGRESS:
			return Object.assign({}, state, {
				uploadFiles: updateItemInArray(state.uploadFiles, action.payload, 'lastModified')
			});
		case ADD_UPLOAD_FILE:
			return Object.assign({}, state, {
				uploadFiles: addNewItemToArrayBegin(state.uploadFiles, action.payload)
			});

		case UPLOAD_FILE_SUCCESS:
			return Object.assign({}, state, {
				filelist: addNewItemToArrayBegin(state.filelist, action.payload)
			});
		case UPLOAD_FILE_FAILURE:
			return state;

		case FETCH_FILES_SUCCESS:
			return Object.assign({}, state, {
				filelist: action.payload
			});
		case FETCH_FILES_FAILURE:
			return state

		case DELETE_FILE_SUCCESS:
			return Object.assign({}, state, {
				filelist: removeSpecificItemByAttrValue(state.filelist, '_id', action.payload)
			});
		case DELETE_FILE_FAILURE:
			return state

		default:
			return state;
	}

}