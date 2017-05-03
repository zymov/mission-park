import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE } from '../actions';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	filelist: []
}

export default function fileCenter(state = initialState, action){

	switch(action.type){

		case UPLOAD_FILE_SUCCESS:
			return Object.assign({}, state, {
				filelist: addNewItemToArrayEnd(state.filelist, action.payload)
			});
		case UPLOAD_FILE_FAILURE:
			return state;

		default:
			return state;
	}

}