import { 
	UPDATE_UPLOAD_PROGRESS, ADD_UPLOAD_FILE, UPDATE_COMPLETED_COUNT, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, 
	FETCH_FILES_SUCCESS, FETCH_FILES_FAILURE, UPDATE_FILE_NAME, 
	DELETE_FILE_SUCCESS, DELETE_FILE_FAILURE,
	CREATE_FOLDER_SUCCESS, CREATE_FOLDER_FAILURE, CHANGE_CURRENT_FOLDER, 
	UPDATE_FILE_SUCCESS, UPDATE_FILE_FAILURE, 
	SELECT_ITEM, UNSELECT_ITEM, SELECT_ALL, UNSELECT_ALL, SET_SELECTED_ITEM_AMOUNT_TO_ZERO
} from '../actions';
import { addNewItemToArrayBegin, addNewItemToArrayEnd, removeSpecificItemByAttrValue, updateItemInArray, getIndexOfArrayByValue } from '../../../utils';

const initialState = {
	selectedItem: [],
	selectAll: false,
	filelist: [],
	uploadFiles: [],
	completedCount: 0,
	currentFolder: {folderId: '0', folderName: 'File Center'},
	folderList: [{folderId: '0', folderName: 'File Center'}]
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
				filelist: addNewItemToArrayEnd(state.filelist, action.payload)
			});
		case UPLOAD_FILE_FAILURE:
			return state;

		case FETCH_FILES_SUCCESS:
			return Object.assign({}, state, {
				filelist: action.payload
			});
		case FETCH_FILES_FAILURE:
			return state;

		case UPDATE_FILE_NAME:
			return Object.assign({}, state, {
				filelist: updateItemInArray(state.filelist, action.payload, '_id')
			});

		case DELETE_FILE_SUCCESS:
			return Object.assign({}, state, {
				filelist: removeSpecificItemByAttrValue(state.filelist, '_id', action.payload)
			});
		case DELETE_FILE_FAILURE:
			return state

		case CREATE_FOLDER_SUCCESS:
			return Object.assign({}, state, {
				filelist: addNewItemToArrayEnd(state.filelist, action.payload)
			});
		case CREATE_FOLDER_FAILURE:
			return state;

		case CHANGE_CURRENT_FOLDER:
			let newFolderList = [];
			let index = getIndexOfArrayByValue(state.folderList, 'folderId', action.payload.folderId);
			if(index == -1){
				newFolderList = addNewItemToArrayEnd(state.folderList, action.payload);
			} else {
				newFolderList = state.folderList.slice(0, index+1);
			}

			return Object.assign({}, state, {
				folderList: newFolderList,
				currentFolder: action.payload
			});

		case UPDATE_FILE_SUCCESS:
			let idx = getIndexOfArrayByValue(state.filelist, '_id', action.payload.oldFileId);
			let stateCopy = state.filelist.slice();
			stateCopy[idx] = action.payload.file;
			return Object.assign({}, state, {
				filelist: stateCopy
			});
		case UPDATE_FILE_FAILURE:
			return state;

		case SELECT_ITEM: 
			return Object.assign({}, state, {
				selectedItem: addNewItemToArrayEnd(state.selectedItem, action.payload)
			});
		case UNSELECT_ITEM: 
			return Object.assign({}, state, {
				selectedItem: removeSpecificItemByAttrValue(state.selectedItem, 'fileId', action.payload.fileId),
				selectAll: false
			});
		case SELECT_ALL: 
			let selectedObjArr = state.filelist.map(function(item){
				return {
					fileId: item._id,
					filename: item.filename
				}
			});
			return Object.assign({}, state, {
				selectedItem: selectedObjArr,
				selectAll: true
			});
		case UNSELECT_ALL: 
			return Object.assign({}, state, {
				selectedItem: [],
				selectAll: false
			});

		case SET_SELECTED_ITEM_AMOUNT_TO_ZERO:
			return Object.assign({}, state, {
				selectedItem: []
			})
		default:
			return state;
	}

}