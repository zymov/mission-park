import React from 'react';

class ChatroomHead extends React.Component {

	render(){

		const { onlineUserlist } = this.props;

		let onlineUserArr = Object.keys(onlineUserlist).map(function(item, index){
			return (
				<li key={onlineUserlist[item].sub} className="online-userlist-item">
					<span className="user-square" >
						<img src={`https://api.adorable.io/avatars/40/${onlineUserlist[item].sub}@adorable.io.png`} title={onlineUserlist[item].name} />
					</span>
				</li>
			);
		});


		return(
			<div className="chatroom-head">
				<ul className="online-userlist clearfix">
					<li className="online-user-title"><span>{`当前在线 ${Object.keys(onlineUserlist).length} 人`}</span></li>
					{onlineUserArr}
				</ul>
				{
					Object.keys(onlineUserlist).length > 12 && 
					<li className="online-userlist-item" style={{display: 'inline-block'}}><span title="更多用户" className="user-square glyphicon glyphicon-option-horizontal"></span></li>
				}

				{/*online-userlist-item className="chatroom-tools">mute notification</div>*/}
				{/*updatedUser && <div className="online-userlist-info">{updatedUser.name}</div>*/}
			</div>
		);
	}

}

export default ChatroomHead;