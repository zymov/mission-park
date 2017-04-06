import React from 'react';

class ChatMessage extends React.Component {

	render(){
		return(
			<li className="message-list-item clearfix">
				<div className="message-body self-msg">
					<div className="message-content"><p>hello every body</p></div>
					<div className="message-info">
						<div className="message-info-time">one minute ago</div>
					</div>
				</div>
			</li>
		);
	}

}

export default ChatMessage;