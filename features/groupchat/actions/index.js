
export const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER';

export function updateOnlineUsers(user, userlist, flag){
	if(flag){
		return {
			type: 'ADD_ONLINE_USER',
			payload: {
				user: user,
				userlist: userlist
			}
		}
	} else {
		return {
			type: 'REMOVE_ONLINE_USER',
			payload: {
				user: user,
				userlist: userlist
			}
		}
	}
}