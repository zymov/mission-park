import React from 'react';
import Dropdown from '../../taskboard/components/dropdown/dropdown';
import { sendmsgMenuList, getIndexOfArrayByValue } from '../../../utils';

class ChatRoom extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			hotKey: 1
		};

		this.sendMsgHotKeyDropdown = {
			menuList: sendmsgMenuList,
			btnId: 'sendmsgTypeDropdown',
			handleClick: this.selectSendMsgHotKey.bind(this),
			dropdownIcon: true
		}

	}


	selectSendMsgHotKey(e){
		let target = e.target;
		if(!target.name) { return; }
		let index = getIndexOfArrayByValue(sendmsgMenuList, 'name', target.name);		//any better way ???
		this.setState({
			hotKey: sendmsgMenuList[index].keyName
		});
	}

	render(){

		return(
			<div className="container chatroom">
				<div className="chatroom-wrapper">
					<div className="chatroom-head">
						<div className="chatroom-tools">mute notification</div>
					</div>
					<div className="message-content-box">
						<ul className="message-list">
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body self-msg">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
							<li className="message-list-item clearfix">
								<div className="message-body">
									<div className="message-content"><p>hello every body</p></div>
									<div className="message-info">
										<div className="message-info-time">one minute ago</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div className="chatroom-footer">
						<div className="sendmsg-box">
							<div className="sendmsg-btn">
								<span className="sendmsg-send">发送</span>
								<Dropdown dropdown={this.sendMsgHotKeyDropdown} btnName="" btnStyle={{}} />
							</div>
							<div className="msg-input-area">
								<input type="textarea" className="form-control" placeholder="说点什么吧" />
								<div className="sendmsg-box-icon">
									<div className="add-files-to-chat"></div>
									<div className="add-emoji-to-chat"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChatRoom;