import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropdown from '../../taskboard/components/dropdown/dropdown';
import { sendmsgMenuList, getIndexOfArrayByValue } from '../../../utils';
import { newMessage } from '../actions';
import FileInput from '../../common/components/fileInput';

class ChatroomInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			hotKey: 1,	// 1 represent for sending message with `enter`
			message: ''
		};

		this.token = jwt_decode(localStorage.getItem('token'));
		this.senderId = this.token.sub;
		this.senderName = this.token.name;
		this.room = this.props.projectId;

		this.sendMsgHotKeyDropdown = {
			menuList: sendmsgMenuList,
			btnId: 'sendmsgTypeDropdown',
			handleClick: this.selectSendMsgHotKey.bind(this),
			dropdownIcon: true
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.fileinputData = {
			handleUpload: this.handleUpload,
			icon: 'glyphicon glyphicon-paperclip',
			id: 'chat_file'
		}
		this.emojiData = {
			handleUpload: this.handleUpload,
			icon: 'glyphicon glyphicon-paperclip',
			id: 'emoji'
		}
	}

	handleUpload(event){
		let path = event.target.value;
		let file = event.target.files[0];

		let fr = new FileReader();
		fr.readAsDataURL(file);
		let that = this;
		fr.onload = function(e){
			let srcData = e.target.result;
			let payload = {
				file: {
					path: srcData, 
					name: file.name,
					lastModified: file.lastModifiedDate
				},
				senderId: that.senderId,
				senderName: that.senderName,
				room: that.room,
				timestamp: (new Date()).toString(),
				byself: true
			};	
			socket.emit('send file', payload);
			that.props.newMessage(payload);
		}

	}

	handleClick(event){
		if(this.state.message.trim()){
			let payload = {
				message: this.state.message, 
				senderId: this.senderId, 
				senderName: this.senderName,
				room: this.room, 
				timestamp: (new Date()).toString(), 
				byself: true
			};
			socket.emit('send message', payload);
			this.props.newMessage(payload);
			this.setState({
				message: ''
			});
		} else {
			return;
		}
	}

	handleKeyDown(event){
		if(event.which == 13 && (this.state.hotKey == 1 && !event.ctrlKey || this.state.hotKey == 2 && event.ctrlKey)){
			event.preventDefault();		//prevent triggering onchange
			if(this.state.message.trim()){
				let payload = {
					message: this.state.message, 
					senderId: this.senderId, 
					senderName: this.senderName,
					room: this.room, 
					timestamp: (new Date()).toString(), 
					byself: true
				};
				socket.emit('send message', payload);
				this.props.newMessage(payload);
				this.setState({
					message: ''
				});
			} else {
				return;
			}
		}
		if(event.which == 13 && (this.state.hotKey == 2 && !event.ctrlKey || this.state.hotKey == 1 && event.ctrlKey)){
			event.preventDefault();
			this.setState({
				message: this.state.message + '\n'
			});
		}
			
	}

	handleKeyPress(event){

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
				<div className="sendmsg-sendfile clearfix">
					<FileInput data={this.fileinputData} />
					<FileInput data={this.emojiData} />
				</div>
				<div className="sendmsg-btn bc-default">
					<span className="sendmsg-send" onClick={this.handleClick}>发送</span>
					<Dropdown dropdown={this.sendMsgHotKeyDropdown} btnName="" btnStyle={{}} />
				</div>
				<div className="msg-input-area">
					<textarea className="form-control" rows="1" name="message" 
						placeholder="说点什么吧" 
						onKeyPress={this.handleKeyPress}
						onKeyDown={this.handleKeyDown}
						onChange={this.handleInputChange} value={this.state.message} />
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