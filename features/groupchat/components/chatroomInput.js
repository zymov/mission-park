import React from 'react';
import Dropdown from '../../taskboard/components/dropdown/dropdown';
import { sendmsgMenuList, getIndexOfArrayByValue } from '../../../utils';

class ChatroomInput extends React.Component {

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
		);
	}

}

export default ChatroomInput;