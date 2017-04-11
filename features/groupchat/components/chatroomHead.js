import React from 'react';

class ChatroomHead extends React.Component {

	render(){

		const { onlineUserlist, updatedUser } = this.props;

		let onlineUserArr = Object.keys(onlineUserlist).map(function(item, index){
			return (
				<li key={onlineUserlist[item]._id} className="online-userlist">
					<span className="user-square" title={onlineUserlist[item].name}>{onlineUserlist[item].name}</span>
				</li>
			);
		});

		return(
			<div className="chatroom-head">
				<ul>
					{onlineUserArr}
				</ul>
				<div className="chatroom-tools">mute notification</div>
				{updatedUser && <div className="online-userlist-info">{updatedUser.name}</div>}
			</div>
		);
	}

}

export default ChatroomHead;