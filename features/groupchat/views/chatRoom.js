import React from 'react';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatMessage from '../components/chatMessage';

class ChatRoom extends React.Component {

	componentDidMount(){
		// let projectId = this.props.params.projectId;
		socket.on('connect', function(){
			console.log(socket.id);
			// socket.emit('join room', { room: projectId, userToken: localStorage.getItem('token') });
		});
		
		socket.on('message', function(obj){
			console.log(obj.msg);
		});
		socket.on('add user', function(data){
			console.log(data.user);
			console.log(data.userlist);
		});
		socket.on('user reconnected', function(data){
			console.log(data.user);
			console.log(data.userlist);
		});

	}


	render(){

		return(
			<div className="container chatroom">
				<div className="chatroom-wrapper">
					<ChatroomHead />
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

export default ChatRoom;