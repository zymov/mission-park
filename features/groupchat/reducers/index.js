import { ADD_ONLINE_USER, REMOVE_ONLINE_USER } from '../actions';

const initialState = {
	onlineUserlist: {},
	updatedUser: null
}

export default function groupchat(state=initialState, action){
	switch(action.type){
		case ADD_ONLINE_USER: 
		case REMOVE_ONLINE_USER: 
			return Object.assign({}, state, {
				updatedUser: action.payload.user,
				onlineUserlist: action.payload.userlist
			});

		default:
			return state;
	}
}





