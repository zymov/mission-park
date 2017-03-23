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
import { isEmptyObject } from '../../../utils';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		const { showNotification, publicErrMsg, tasklistInfoText, taskInfoText, 
						currentTasklistId, tasklists,
						taskDetail } = this.props;

		let projectId = this.props.params.projectId;

		var fetchedTaskList = [];

		fetchedTaskList = tasklists.map(function(tasklist, index){
			return <Tasklist key={index} index={index} tasklist={tasklist} />;
		});

		return(
				<div className="container taskboard">
					<NotificationsContainer>
						{(!isEmptyObject(publicErrMsg) && showNotification) && <Notification notification={publicErrMsg} />}
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
		publicErrMsg:  					state.common.publicErrMsg,
		taskInfoText: 					tb.task.taskInfoText,
		currentTasklistId: 			tb.task.currentTasklistId,
		taskDetail: 						tb.task.taskDetail,
		tasklists: 							tb.tasklist.tasklists,
		tasklistInfoText: 			tb.tasklist.tasklistInfoText
	}
}

// const mapDispatchToProps = dispatch => ({
// })

export default connect(mapStateToProps, null)(Board);