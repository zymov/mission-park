import React from 'react';
import { connect } from 'react-redux';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatMessage from '../components/chatMessage';
import { updateOnlineUsers, newMessage } from '../actions';

class ChatRoom extends React.Component {

	componentDidMount(){
		let projectId = this.props.params.projectId;
		let that = this;
		socket.emit('join room', { room: projectId, userToken: localStorage.getItem('token') });

		socket.on('new message', function(data){
			console.log('new message');
			console.log(data.message, data.timestamp, data.byself);
			that.props.newMessage(data);
		});

		socket.on('add user', function(data){
			console.log('add user');
			console.log(data.user);
			console.log(data.userlist);
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user reconnect', function(data){
			console.log('user reconnect');
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user leave', function(data){
			console.log('user leave');
			console.log(data.user);
			console.log(data.userlist);
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
						<ChatroomInput />
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
	updateOnlineUsers: (user, userlist) => { dispatch(updateOnlineUsers(user, userlist)); },
	newMessage: (data) => { dispatch(newMessage(data)); }

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);