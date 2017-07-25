import axios from 'axios';
import * as types from '../constants';

export function updateOnlineUsers(user, userlist){
	return {
		type: types.UPDATE_ONLINE_USERS,
		payload: {
			user: user,
			userlist: userlist
		}
	}
}

export function newMessage(data){
	return {
		type: types.NEW_MESSAGE,
		payload: {
			messageId: data.messageId,
			message: data.message,
			file: data.file,
			timestamp: data.timestamp,
			senderId: data.senderId,
			senderName: data.senderName
			// byself: data.byself
		}
	}
}

export function getMessageHistory(projectId){
	return function(dispatch){
		dispatch(getMessageHistoryRequest());
		axios.get('/chat/getmessagehistory', {
				params: { 
					room: projectId 
				}
			})
			.then(function(res){
				dispatch(getMessageHistorySuccess(res.data.messages, res.data.haveMore));
			})
			.catch(function(err){
				dispatch(getMessageHistoryFailure(err));
			});
	}
}

export function getMessageHistoryRequest(){
	return {
		type: types.GET_MESSAGE_HISTORY_REQUEST
	}
}

export function getMessageHistorySuccess(messages, haveMore){
	return {
		type: types.GET_MESSAGE_HISTORY_SUCCESS,
		payload: {
			messages: messages,
			haveMore: haveMore
		}
	}
}

export function getMessageHistoryFailure(error){
	return {
		type: types.GET_MESSAGE_HISTORY_FAILURE,
		payload: {
			error: error
		}
	}
}

export function closeImgViewer(){
	return {
		type: types.CLOSE_IMG_VIEWER
	}
}

export function openImgViewer(imgData){
	return {
		type: types.OPEN_IMG_VIEWER,
		payload: imgData
	}
}

export function fetchOlderChatHistory(projectId, currentMsgCount){
	return function(dispatch){
		dispatch(fetchOlderChatHistoryRequest());
		axios.get('/chat/fetcholderchathistory', {
			params: {
				room: projectId,
				currentMsgCount: currentMsgCount
			}
		}).then(function(res){
			dispatch(fetchOlderChatHistorySuccess(res.data.chatHistory, res.data.haveMore));
		}).catch(function(err){
			dispatch(fetchOlderChatHistoryFailure(err));
		})
	}
}

export function fetchOlderChatHistoryRequest(){
	return {
		type: types.FETCH_OLDER_CHAT_HISTORY_REQUEST
	}
}

export function fetchOlderChatHistorySuccess(chatHistory, haveMore){
	return {
		type: types.FETCH_OLDER_CHAT_HISTORY_SUCCESS,
		payload: {
			chatHistory: chatHistory,
			haveMore: haveMore
		}
	}
}
export function fetchOlderChatHistoryFailure(error){
	return {
		type: types.FETCH_OLDER_CHAT_HISTORY_FAILURE,
		payload: {
			error: error
		}
	}
}