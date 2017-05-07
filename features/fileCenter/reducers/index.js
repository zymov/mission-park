import { 
	UPDATE_UPLOAD_PROGRESS, ADD_UPLOAD_FILE, UPDATE_COMPLETED_COUNT, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, 
	FETCH_FILES_SUCCESS, FETCH_FILES_FAILURE, UPDATE_FILE_ITEM, 
	DELETE_FILE_SUCCESS, DELETE_FILE_FAILURE 
} from '../actions';
import { addNewItemToArrayBegin, removeSpecificItemByAttrValue, updateItemInArray } from '../../../utils';

const initialState = {
	filelist: [],
	uploadFiles: [],
	completedCount: 0
}

export default function fileCenter(state = initialState, action){

	switch(action.type){

		case UPDATE_UPLOAD_PROGRESS:
			return Object.assign({}, state, {
				uploadFiles: updateItemInArray(state.uploadFiles, action.payload, 'timestamp')
			});
		case UPDATE_COMPLETED_COUNT:
			return Object.assign({}, state, {
				completedCount: state.completedCount + 1
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
		case UPDATE_FILE_ITEM:
			return Object.assign({}, state, {
				filelist: updateItemInArray(state.filelist, action.payload, '_id')
			});

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