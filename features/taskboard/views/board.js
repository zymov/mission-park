import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import TasklistToolbar from './tasklistToolbar';
import TasklistContainer from './tasklistContainer';
import TaskToolbar from './taskToolbar';
import TaskContainer from './taskContainer';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		const { tasklistLoading, tasklistError, tasklistInfoText, 
						taskLoading, taskError, taskInfoText, 
						currentTasklistId } = this.props;

		return(
				<div className="container taskboard">
					{tasklistLoading && <div className="container col-md-9 alert alert-default" role="alert">{tasklistInfoText}.</div>}
					{taskLoading && <div className="container col-md-9 alert alert-default" role="alert">{taskInfoText}.</div>}
					{tasklistError && <div className="container col-md-9 alert alert-danger" role="alert">{tasklistInfoText}.</div>}
					{taskError && <div className="container col-md-9 alert alert-danger" role="alert">{taskInfoText}.</div>}
					<div className="row">
						<div className="col-md-4">
							<TasklistToolbar projectId={this.props.params.projectId} />
							<TasklistContainer projectId={this.props.params.projectId} />
						</div>
						<div className="col-md-8">
							{ currentTasklistId && <TaskToolbar tasklistId={currentTasklistId}/> }
							{ currentTasklistId && <TaskContainer tasklistId={currentTasklistId}/> }
						</div>
					</div>
				</div>
		)
	}
}

const mapStateToProps = state => {
	const tb = state.taskboard;
	return {
		taskLoading: 						tb.task.taskLoading,
		taskError: 							tb.task.taskError,
		taskInfoText: 					tb.task.taskInfoText,
		currentTasklistId: 			tb.task.currentTasklistId,

		tasklistLoading: 				tb.tasklist.tasklistLoading,
		tasklistError: 					tb.tasklist.tasklistError,
		tasklistInfoText: 			tb.tasklist.tasklistInfoText,
	}
}

// const mapDispatchToProps = dispatch => ({
// 	fetchTasklist: projectId => { dispatch(fetchTasklist(projectId)); },
// 	fetchTask: tasklistId => { dispatch(fetchTask(tasklistId)); }
// })

export default connect(mapStateToProps, null)(Board);