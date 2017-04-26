import React from 'react';
import { getLocaleDate } from '../../../utils';
import ImageMessage from './imageMessage';

class ChatMessage extends React.Component {

	render(){

		const { message, file, timestamp, senderId, senderName, byself } = this.props.message;
		let checkByself = false, _timestamp = timestamp;

		if(!byself){
			checkByself = jwt_decode(localStorage.getItem('token')).sub == senderId;
		}
		if(~timestamp.indexOf('-')){
			_timestamp = getLocaleDate(timestamp.replace('T', ' ').slice(0, -5));
		}

		return(
			<li className="message-list-item clearfix">
				<div className={`message-body ${byself || checkByself ? 'self-msg' : ''}`}>
					<div className="user-avatar" title={senderName}><img src={`https://api.adorable.io/avatars/40/${senderId}@adorable.io.png`} /></div>
					{ message && <div className="message-content" dangerouslySetInnerHTML={{ __html: message }} ></div> }
					{ file && <div className="message-content"><ImageMessage src={file.path} name={file.name} /></div> }
					<div className="message-info">
						<div className="message-info-time">{_timestamp.toString().substring(16, 24)}</div>
					</div>
				</div>
			</li>
		);
	}

}

export default ChatMessage;