import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropdown from '../../common/components/dropdown/dropdown';
import { getIndexOfArrayByValue, setEndOfContenteditable, getCaretCharacterOffsetWithin, getHTMLCaretPosition } from '../../../utils';
import { sendmsgMenuList } from '../constants/constValue';
import { newMessage } from '../actions';
import FileInput from '../../common/components/fileInput';
import Emoji from './emoji';

class ChatroomInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			hotKey: 1,	// 1 represent for sending message with `enter`
			message: ''
		};

		this.decodedToken = this.props.decodedToken;
		this.senderId = this.decodedToken.sub;
		this.senderName = this.decodedToken.name;
		this.room = this.props.projectId;

		this.sendMsgHotKeyDropdown = {
			menuList: sendmsgMenuList,
			btnId: 'sendmsgTypeDropdown',
			handleClick: this.selectSendMsgHotKey.bind(this),
			dropdownIcon: true
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.sendEmoji = this.sendEmoji.bind(this);
		this.fileinputData = {
			handleUpload: this.handleUpload,
			icon: 'glyphicon glyphicon-paperclip',
			id: 'chat_file',
			accept: 'image/*',
			title: 'send image',
			labelText: ''
		}
	}

	handleUpload(event){
		let path = event.target.value;
		let file = event.target.files[0];
		if(file.size == 0) {return;}

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
				timestamp: (new Date()).toString()
				// byself: true
			};	
			socket.emit('send file', payload);
			// that.props.newMessage(payload);
		}

	}

	handleClick(event){
		if(this.state.message.replace(/&nbsp;/g, ' ').trim()){
			let payload = {
				message: this.state.message, 
				senderId: this.senderId, 
				senderName: this.senderName,
				room: this.room, 
				timestamp: (new Date()).toString() 
				// byself: true
			};
			socket.emit('send message', payload);
			// this.props.newMessage(payload);
			this.setState({
				message: ''
			});
			this.refs.textarea.innerHTML = "";
		} else {
			return;
		}
	}

	handleKeyDown(event){
		if(event.which == 13 && (this.state.hotKey == 1 && !event.ctrlKey || this.state.hotKey == 2 && event.ctrlKey)){
			event.preventDefault();		//prevent triggering onchange
			// let message = this.state.message.trim().replace(/<div.*?><\/div>/g, '<br>');
			// message.replace(/<br>/g,'')
			if(this.state.message.replace(/&nbsp;/g, ' ').trim()){
				let payload = {
					message: this.state.message, 
					senderId: this.senderId, 
					senderName: this.senderName,
					room: this.room, 
					timestamp: (new Date()).toString() 
					// byself: true
				};
				socket.emit('send message', payload);
				// this.props.newMessage(payload);
				this.setState({
					message: ''
				});
				this.refs.textarea.innerHTML = "";
			} else {
				return;
			}
		}
		// change line 
		// if(event.which == 13 && (this.state.hotKey == 2 && !event.ctrlKey || this.state.hotKey == 1 && event.ctrlKey)){
		// 	event.preventDefault();
		// 	this.refs.textarea.innerHTML += this.refs.textarea.innerHTML.length > 0 ? 
		// 																	'<div class="br-div"></div>' : 
		// 																	'<div class="br-div"></div><div class="br-div"></div>';
		// 	setEndOfContenteditable(event.target);	//move cursor to the last line
		// 	$('.divTextarea div:last-child')[0].scrollIntoView();
		// 	this.setState({
		// 		message: this.state.message + '<br>'
		// 	});
		// }
			
	}

	handleKeyPress(event){

	}

	handleInput(event){
		let text = this.refs.textarea.innerHTML;
		this.setState({
			message: text
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

	sendEmoji(event){
		let cursorPos = getHTMLCaretPosition(this.refs.textarea);
		let emoji = event.target.outerHTML;
		this.setState({
			message: this.state.message.slice(0, cursorPos) + emoji + this.state.message.slice(cursorPos)
		});
		let text = this.refs.textarea.innerHTML;
		this.refs.textarea.innerHTML = text.slice(0, cursorPos) + emoji + text.slice(cursorPos);
	}

	render(){
		return(
			<div className="sendmsg-box">
				<div className="sendmsg-sendfile clearfix">
					<FileInput data={this.fileinputData} />
					<Emoji sendEmoji={this.sendEmoji} />
				</div>
				<div className="sendmsg-btn bc-default">
					<span className="sendmsg-send" onClick={this.handleClick}>发送</span>
					<Dropdown dropdown={this.sendMsgHotKeyDropdown} btnName="" btnStyle={{}} />
				</div>
				<div className="msg-input-area">
					<div className="divTextarea" name="message" 
						contentEditable
						ref="textarea" 
						onKeyPress={this.handleKeyPress}
						onKeyDown={this.handleKeyDown}
						onInput={this.handleInput} ></div>
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