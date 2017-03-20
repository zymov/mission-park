import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import TasklistToolbar from '../components/tasklistToolbar';
import TasklistContainer from '../components/tasklistContainer';
import TaskToolbar from '../components/taskToolbar';
import TaskContainer from '../components/taskContainer';
import Tasklist from '../components/tasklist';
import TaskDetail from '../components/taskDetail';

class Board extends React.Component {

	constructor(props){
		super(props);
	}


	componentWillReceiveProps(nextProps){
		if(this.props.taskDetail != nextProps.taskDetail){
			console.log(nextProps.taskDetail._id, nextProps.taskDetail.taskName);
			// $(`[data-target="#taskDetail${nextProps.taskDetail._id}"]`).click();
		}
	}

	render(){

		const { publicErrMsg, tasklistLoading, tasklistError, tasklistInfoText, 
						taskLoading, taskError, taskInfoText, 
						currentTasklistId, tasklists,
						dropdownLoading, dropdownError, dropdownInfoText,
						showTaskDetail, taskDetail } = this.props;

		let projectId = this.props.params.projectId;

		var fetchedTaskList = [];

		fetchedTaskList = tasklists.map(function(tasklist, index){
			return <Tasklist key={index} index={index} tasklist={tasklist} />;
		});

		return(
				<div className="container taskboard">
					{publicErrMsg && <div className="container col-md-9 alert alert-danger" role="alert">{publicErrMsg}.</div>}
					
					{tasklistLoading && <div className="container col-md-9 alert alert-default" role="alert">{tasklistInfoText}.</div>}
					{taskLoading && <div className="container col-md-9 alert alert-default" role="alert">{taskInfoText}.</div>}
					{/*dropdownLoading && <div className="container col-md-9 alert alert-default" role="alert">{dropdownInfoText}.</div>*/}

					{tasklistError && <div className="container col-md-9 alert alert-danger" role="alert">{tasklistInfoText}.</div>}
					{taskError && <div className="container col-md-9 alert alert-danger" role="alert">{taskInfoText}.</div>}
					{/*dropdownError && <div className="container col-md-9 alert alert-danger" role="alert">{dropdownInfoText}.</div>*/}

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
		publicErrMsg:  					state.common.publicErrMsg,

		taskLoading: 						tb.task.taskLoading,
		taskError: 							tb.task.taskError,
		taskInfoText: 					tb.task.taskInfoText,
		currentTasklistId: 			tb.task.currentTasklistId,

		dropdownLoading: 				tb.task.dropdownLoading,
		dropdownError: 					tb.task.dropdownError,
		dropdownInfoText: 			tb.task.dropdownInfoText,

		taskDetail: 						tb.task.taskDetail,

		tasklists: 							tb.tasklist.tasklists,
		tasklistLoading: 				tb.tasklist.tasklistLoading,
		tasklistError: 					tb.tasklist.tasklistError,
		tasklistInfoText: 			tb.tasklist.tasklistInfoText


	}
}

// const mapDispatchToProps = dispatch => ({
// })

export default connect(mapStateToProps, null)(Board);