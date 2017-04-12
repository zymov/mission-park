
export const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS';

export function updateOnlineUsers(user, userlist){
	return {
		type: 'UPDATE_ONLINE_USERS',
		payload: {
			user: user,
			userlist: userlist
		}
	}
}