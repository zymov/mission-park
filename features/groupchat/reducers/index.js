import { UPDATE_ONLINE_USERS, NEW_MESSAGE } from '../actions';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	onlineUserlist: {},
	updatedUser: null,
	messageList: []
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


		default:
			return state;
	}
}





