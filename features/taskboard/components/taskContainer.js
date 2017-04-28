import React from 'react';
import { connect } from 'react-redux';
import Task from './task';
// import * as actionCreators from '../actions/taskActions';

class TaskContainer extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		let fetchedTasks = [];
		let tasklistId = this.props.tasklistId;
		let projectId = this.props.projectId;

		fetchedTasks = this.props.tasks.map(function(task, index){
			return <Task key={index} task={task} tasklistId={tasklistId} projectId={projectId} />;
		});

		return(
			<div className="task-container">
				{fetchedTasks}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const tbt = state.taskboard.task;
	return {
		tasks: tbt.tasks,
	}
}

// const mapDispatchToProps = dispatch => ({
	
// });

export default connect(mapStateToProps, null)(TaskContainer);