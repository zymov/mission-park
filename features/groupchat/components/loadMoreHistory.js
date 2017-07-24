import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../common/components/spinner';
import { fetchOlderChatHistory } from '../actions';

class LoadMoreHistory extends React.Component {

	handleClick(){
		this.props.fetchOlderChatHistory(this.props.projectId, this.props.currentMsgCount);
	}

	render(){

		let { haveMore, msgLoading, oldMsgLoading } = this.props;

		return(
			<li className="message-list-item" onClick={this.handleClick.bind(this)} style={{display: haveMore ? 'block' : 'none'}} >
				<Spinner show={msgLoading || oldMsgLoading}/>
				{(msgLoading || oldMsgLoading) || <p className="loadmore" >点击加载更多</p>}
			</li>
		);

	}
}

const mapStateToProps = state => ({
	msgLoading: state.groupchat.msgLoading,
	oldMsgLoading: state.groupchat.oldMsgLoading
});

const mapDispatchToProps = dispatch => ({
	fetchOlderChatHistory: (projectId, currentMsgCount) => { dispatch(fetchOlderChatHistory(projectId, currentMsgCount)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreHistory);