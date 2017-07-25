// import { UPDATE_ONLINE_USERS, NEW_MESSAGE, 
// 	GET_MESSAGE_HISTORY_REQUEST, GET_MESSAGE_HISTORY_SUCCESS, GET_MESSAGE_HISTORY_FAILURE, 
// 	FETCH_OLDER_CHAT_HISTORY_REQUEST, FETCH_OLDER_CHAT_HISTORY_SUCCESS, FETCH_OLDER_CHAT_HISTORY_FAILURE, 
// 	CLOSE_IMG_VIEWER, OPEN_IMG_VIEWER } from '../actions';
import * as types from '../constants';
import { addNewItemToArrayEnd } from '../../../utils';

const initialState = {
	msgLoading: false,
	oldMsgLoading: false,
	onlineUserlist: {},
	updatedUser: null,
	messageList: [],
	haveMore: true,
	showImgViewer: false,
	imgData: {
		src: '',
		name: ''
	},
	infoText: {}
}

export default function groupchat(state=initialState, action){
	switch(action.type){
		case types.UPDATE_ONLINE_USERS: 
			return Object.assign({}, state, {
				updatedUser: action.payload.user,
				onlineUserlist: action.payload.userlist
			});

		case types.NEW_MESSAGE:
			return Object.assign({}, state, {
				messageList: addNewItemToArrayEnd(state.messageList, action.payload)
			});

		case types.GET_MESSAGE_HISTORY_REQUEST:
			return Object.assign({}, state, {
				msgLoading: true,
				messageList: []
			});
		case types.GET_MESSAGE_HISTORY_SUCCESS:
			return Object.assign({}, state, {
				msgLoading: false,
				messageList: action.payload.messages.reverse(),
				haveMore: action.payload.haveMore
			});
		case types.GET_MESSAGE_HISTORY_FAILURE:
			return Object.assign({}, state, {
				msgLoading: false,
				messageList: [],
				infoText: {
					message: '获取历史消息失败',
					level: 'error'
				}
			});

		case types.FETCH_OLDER_CHAT_HISTORY_REQUEST:
			return Object.assign({}, state, {
				oldMsgLoading: true
			});
		case types.FETCH_OLDER_CHAT_HISTORY_SUCCESS:
			return Object.assign({}, state, {
				oldMsgLoading: false,
				messageList: action.payload.chatHistory.reverse().concat(state.messageList),
				haveMore: action.payload.haveMore
			});
		case types.FETCH_OLDER_CHAT_HISTORY_FAILURE:
			return Object.assign({}, state, {
				oldMsgLoading: false,
				infoText: {
					message: '加载历史信息失败',
					level: 'error'
				}
			});
		
		case types.CLOSE_IMG_VIEWER:
			return Object.assign({}, state, {
				showImgViewer: false
			});
		case types.OPEN_IMG_VIEWER:
			return Object.assign({}, state, {
				showImgViewer: true,
				imgData: action.payload
			});

		default:
			return state;
	}
}





