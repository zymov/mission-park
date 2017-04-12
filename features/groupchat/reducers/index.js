import { UPDATE_ONLINE_USERS } from '../actions';

const initialState = {
	onlineUserlist: {},
	updatedUser: null
}

export default function groupchat(state=initialState, action){
	switch(action.type){
		case UPDATE_ONLINE_USERS: 
			return Object.assign({}, state, {
				updatedUser: action.payload.user,
				onlineUserlist: action.payload.userlist
			});

		default:
			return state;
	}
}





