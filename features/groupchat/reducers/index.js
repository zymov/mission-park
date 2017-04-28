import { UPDATE_ONLINE_USERS, NEW_MESSAGE, GET_MESSAGE_HISTORY_SUCCESS, GET_MESSAGE_HISTORY_FAILURE, CLOSE_IMG_VIEWER, OPEN_IMG_VIEWER } from '../actions';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	onlineUserlist: {},
	updatedUser: null,
	messageList: [],
	showImgViewer: false,
	imgData: {
		src: '',
		name: ''
	}
}

export default function groupchat(state=initialState, action){
	switch(action.type){
		case UPDATE_ONLINE_USERS: 
			return Object.assign({}, state, {
				updatedUser: action.payload.user,
				onlineUserlist: action.payload.userlist
			});

		case NEW_MESSAGE:
			return Object.assign({}, state, {
				messageList: addNewItemToArrayEnd(state.messageList, action.payload)
			});

		case GET_MESSAGE_HISTORY_SUCCESS:
			return Object.assign({}, state, {
				messageList: action.payload.messages
			});
		case GET_MESSAGE_HISTORY_FAILURE:
			return Object.assign({}, state, {
				messageList: action.payload.error
			});
		
		case CLOSE_IMG_VIEWER:
			return Object.assign({}, state, {
				showImgViewer: false
			});
		case OPEN_IMG_VIEWER:
			return Object.assign({}, state, {
				showImgViewer: true,
				imgData: action.payload
			});

		default:
			return state;
	}
}





