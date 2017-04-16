
export const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export function updateOnlineUsers(user, userlist){
	return {
		type: 'UPDATE_ONLINE_USERS',
		payload: {
			user: user,
			userlist: userlist
		}
	}
}

export function newMessage(data){
	return {
		type: 'NEW_MESSAGE',
		payload: {
			message: data.message,
			timestamp: data.timestamp,
			user: data.user,
			byself: data.byself
		}
	}
}