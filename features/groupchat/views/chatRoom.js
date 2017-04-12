import React from 'react';
import { connect } from 'react-redux';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatMessage from '../components/chatMessage';
import { updateOnlineUsers } from '../actions';

class ChatRoom extends React.Component {

	componentDidMount(){
		let projectId = this.props.params.projectId;
		let that = this;
		socket.emit('join room', { room: projectId, userToken: localStorage.getItem('token') });

		socket.on('message', function(obj){
			console.log('message');
			console.log(obj.msg);
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

		const { onlineUserlist, updatedUser } = this.props;

		return(
			<div className="container chatroom">
				<div className="chatroom-wrapper">
					<ChatroomHead onlineUserlist={onlineUserlist} updatedUser={updatedUser} />
					<div className="message-content-box">
						<ul className="message-list">
							<ChatMessage />
							<ChatMessage />
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
	updatedUser: state.groupchat.updatedUser
});

const mapDispatchToProps = dispatch => ({
	updateOnlineUsers: (user, userlist) => { dispatch(updateOnlineUsers(user, userlist)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);