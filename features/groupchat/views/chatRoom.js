import React from 'react';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatMessage from '../components/chatMessage';

class ChatRoom extends React.Component {

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