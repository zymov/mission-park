import React from 'react';

class ChatMessage extends React.Component {

	render(){

		const { message, timestamp, user, byself } = this.props.message;

		return(
			<li className="message-list-item clearfix">
				<div className={`message-body ${byself ? 'self-msg' : ''}`}>
					<div className="user-avatar" title={user.name}></div>
					<div className="message-content">{message}</div>
					<div className="message-info">
						<div className="message-info-time">{timestamp.substring(16, 24)}</div>
					</div>
				</div>
			</li>
		);
	}

}

export default ChatMessage;