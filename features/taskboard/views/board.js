import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import TasklistToolbar from '../components/tasklistToolbar';
import TasklistContainer from '../components/tasklistContainer';
import TaskToolbar from '../components/taskToolbar';
import TaskContainer from '../components/taskContainer';
import Tasklist from '../components/tasklist';
import TaskDetail from '../components/taskDetail';
import Notification from '../../common/components/notification/notification';
import NotificationsContainer from '../../common/components/notification/notificationsContainer';
import { updateOnlineUsers } from '../../groupchat/actions';
import { isEmptyObject } from '../../../utils';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		let projectId = this.props.params.projectId;
		let that = this;
		socket.on('connect', function(){
			console.log('socket id: ', socket.id);
		});
		socket.emit('join room', { room: projectId, userToken: localStorage.getItem('token') });

		socket.on('add user', function(data){
			console.log('add user');
			console.log(data.user);
			console.log(data.userlist);
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user reconnect', function(data){
			console.log('user reconnect');
			that.props.updateOnlineUsers(data.user, data.userlist);
		});

		socket.on('user leave', function(data){
			console.log('user leave');
			console.log(data.user);
			console.log(data.userlist);
			that.props.updateOnlineUsers(data.user, data.userlist);
		});
	}

	render(){

		const { showNotification, publicMsg, tasklistInfoText, taskInfoText, 
						currentTasklistId, tasklists, tasks,
						taskDetail } = this.props;

		let projectId = this.props.params.projectId;

		let fetchedTaskList = [];

		fetchedTaskList = tasklists.map(function(tasklist, index){
			return <Tasklist key={index} index={index} tasklist={tasklist} />;
		});

		return(
				<div className="container taskboard">
					<NotificationsContainer>
						{(!isEmptyObject(publicMsg) && showNotification) && <Notification notification={publicMsg} />}
						{(!isEmptyObject(tasklistInfoText) && showNotification) && <Notification notification={tasklistInfoText} />}
						{(!isEmptyObject(taskInfoText) && showNotification) && <Notification notification={taskInfoText} />}
					</NotificationsContainer>
					
					<div className="row">
						<div className="tasklist-box col-md-4">
							<TasklistToolbar projectId={projectId} />
							<TasklistContainer projectId={projectId} >
								{fetchedTaskList}
							</TasklistContainer>
						</div>
						<div className="task-box col-md-8">
							{ currentTasklistId && <TaskToolbar projectId={projectId}  tasklistId={currentTasklistId}/> }
							{ currentTasklistId && <TaskContainer projectId={projectId}  tasklistId={currentTasklistId}/> }
						</div>
					</div>
					<TaskDetail 
						projectId={projectId} 
						taskDetail={taskDetail} 
						modalName={`taskDetail${taskDetail ? taskDetail._id : ''}`} 
					/>
				</div>
		)
	}
}

const mapStateToProps = state => {
	const tb = state.taskboard;
	return {
		showNotification: 			state.common.showNotification,
		publicMsg:  						state.common.publicMsg,
		taskInfoText: 					tb.task.taskInfoText,
		currentTasklistId: 			tb.task.currentTasklistId,
		taskDetail: 						tb.task.taskDetail,
		tasklists: 							tb.tasklist.tasklists,
		tasklistInfoText: 			tb.tasklist.tasklistInfoText,
		tasks: 									tb.task.tasks
	}
}

const mapDispatchToProps = dispatch => ({
	updateOnlineUsers: (user, userlist) => { dispatch(updateOnlineUsers(user, userlist)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);