import React from 'react';
import { connect } from 'react-redux';
import ChatroomInput from '../components/chatroomInput';
import ChatroomHead from '../components/chatroomHead';
import ChatroomBody from '../components/chatroomBody';
// import ChatMessage from '../components/chatMessage';
import ImgViewer from '../components/imgViewer';
import { getMessageHistory, updateOnlineUsers, newMessage } from '../actions';

class ChatRoom extends React.Component {

	constructor(props){
		super(props);

		this.token = localStorage.getItem('token');
		this.decodedToken = jwt_decode(this.token);

	}

	componentWillMount(){
		this.props.getMessageHistory(this.props.params.projectId);
	}

	componentDidMount(){
		let projectId = this.props.params.projectId;
		let that = this;

		socket.emit('join room', { room: projectId, userToken: this.token });

		socket.removeListener('new message');		// avoid duplicate event listeners when component remount
		socket.on('new message', function(data){
			that.props.newMessage(data);
		});

		socket.on('add user', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user reconnect', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user leave', function(data){
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

	}


	render(){

		const { onlineUserlist, updatedUser } = this.props;

		return(
			<div className="container chatroom">
				<div className="chatroom-wrapper">
					<ChatroomHead onlineUserlist={onlineUserlist} updatedUser={updatedUser} />
					<ChatroomBody projectId={this.props.params.projectId} decodedToken={this.decodedToken} />
					<div className="chatroom-footer">
						<ChatroomInput projectId={this.props.params.projectId} decodedToken={this.decodedToken} />
					</div>
				</div>
				
			</div>
		);
	}
}

const mapStateToProps = state => ({
	onlineUserlist: state.groupchat.onlineUserlist,
	updatedUser: state.groupchat.updatedUser
});

const mapDispatchToProps = dispatch => ({
	getMessageHistory: (projectId) => { dispatch(getMessageHistory(projectId)); },
	updateOnlineUsers: (user, userlist) => { dispatch(updateOnlineUsers(user, userlist)); },
	newMessage: (data) => { dispatch(newMessage(data)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);