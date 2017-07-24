import React from 'react';
import ChatMessage from './chatMessage';
import { connect } from 'react-redux';
import LoadMoreHistory from './loadMoreHistory';

class ChatroomBody extends React.Component {

	// componentWillReceiveProps(nextProps){

	// }

	componentDidUpdate(prevProps, prevState){
		if(prevProps.oldMsgLoading == this.props.oldMsgLoading){
			$('.message-list li:last-child')[0].scrollIntoView();
		}
	}

	render(){

		let { haveMore, messageList, projectId } = this.props;

		let messageArr = messageList.map(function(item){
			return(
				<ChatMessage key={item._id} message={item} />
			);
		});

		return(
			<div className="message-content-box">
				<ul className="message-list">
					<LoadMoreHistory haveMore={haveMore} currentMsgCount={messageList.length} projectId={projectId} />
					{messageArr}
				</ul>
			</div>
		);

	}

}

const mapStateToProps = state => ({
	oldMsgLoading: state.groupchat.oldMsgLoading,
	haveMore: state.groupchat.haveMore,
	messageList: state.groupchat.messageList
});

export default connect(mapStateToProps, null)(ChatroomBody);