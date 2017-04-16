import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../taskboard/components/dropdown/dropdown';
import { sendmsgMenuList, getIndexOfArrayByValue } from '../../../utils';
import { newMessage } from '../actions';

class ChatroomInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			hotKey: 1,
			message: ''
		};

		this.sendMsgHotKeyDropdown = {
			menuList: sendmsgMenuList,
			btnId: 'sendmsgTypeDropdown',
			handleClick: this.selectSendMsgHotKey.bind(this),
			dropdownIcon: true
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(event){
		if(this.state.message){
			let payload = {message: this.state.message, timestamp: (new Date()).toString(), byself: true};
			socket.emit('send message', payload);
			this.props.newMessage(payload);
			this.setState({
				message: ''
			});
		} else {
			return;
		}
	}

	handleKeyPress(event){
		if(event.charCode == 13){
			event.preventDefault();		//prevent triggering onchange
			if(this.state.message){
				let payload = {message: this.state.message, timestamp: (new Date()).toString(), byself: true};
				socket.emit('send message', payload);
				this.props.newMessage(payload);
				this.setState({
					message: ''
				});
			} else {
				return;
			}
		}
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
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
					<span className="sendmsg-send" onClick={this.handleClick}>发送</span>
					<Dropdown dropdown={this.sendMsgHotKeyDropdown} btnName="" btnStyle={{}} />
				</div>
				<div className="msg-input-area">
					<textarea className="form-control" rows="1" name="message" 
						placeholder="说点什么吧" 
						onKeyPress={this.handleKeyPress}
						onChange={this.handleInputChange} value={this.state.message} />
					<div className="sendmsg-box-icon">
						<div className="add-files-to-chat"></div>
						<div className="add-emoji-to-chat"></div>
					</div>
				</div>
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	currentUser: state.auth.currentUser
// });

const mapDispatchToProps = dispatch => ({
	newMessage: payload => { dispatch(newMessage(payload)); }
});

export default connect(null, mapDispatchToProps)(ChatroomInput);