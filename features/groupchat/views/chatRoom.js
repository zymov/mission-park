import React from 'react';
import { connect } from 'react-redux';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatMessage from '../components/chatMessage';
import { getChatroomHistory, updateOnlineUsers, newMessage } from '../actions';

class ChatRoom extends React.Component {

	componentWillMount(){
		console.log('chatroom will mount');
		this.props.getChatroomHistory(this.props.params.projectId);
	}

	componentDidMount(){
		let projectId = this.props.params.projectId;
		let that = this;

		// console.log('token', jwt_decode(localStorage.getItem('token')));

		socket.emit('join room', { room: projectId, userToken: localStorage.getItem('token') });

		socket.removeListener('new message');		// avoid duplicated event listeners when component remount
		socket.on('new message', function(data){
			that.props.newMessage(data);
		});

		socket.on('add user', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user reconnect', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user leave', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

	}


	render(){

		const { onlineUserlist, updatedUser, messageList } = this.props;

		let messageArr = messageList.map(function(item, index){
			return(
				<ChatMessage key={index} message={item} />
			);
		});

		return(
			<div className="container chatroom">
				<div className="chatroom-wrapper">
					<ChatroomHead onlineUserlist={onlineUserlist} updatedUser={updatedUser} />
					<div className="message-content-box">
						<ul className="message-list">
							{messageArr}
						</ul>
					</div>
					<div className="chatroom-footer">
						<ChatroomInput projectId={this.props.params.projectId} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	onlineUserlist: state.groupchat.onlineUserlist,
	updatedUser: state.groupchat.updatedUser,
	messageList: state.groupchat.messageList
});

const mapDispatchToProps = dispatch => ({
	getChatroomHistory: (projectId) => { dispatch(getChatroomHistory(projectId)); },
	updateOnlineUsers: (user, userlist) => { dispatch(updateOnlineUsers(user, userlist)); },
	newMessage: (data) => { dispatch(newMessage(data)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);