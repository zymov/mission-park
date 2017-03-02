import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Task from './task';
import TaskToolbar from './taskToolbar';
import * as actionCreators from '../actions/taskActions';

class TaskContainer extends React.Component {

	constructor(props){
		super(props);
	}

	// componentWillMount(){
	// 	this.props.actions.fetchTask(this.props.currentTasklistId, this.props.activeTasklist);
	// }

	render(){
		const { taskLoading, tasks, newTask, taskError, taskInfoText, currentTasklistId } = this.props;

		var fetchedTasks = [];

		fetchedTasks = tasks.map(function(task, index){
			return <Task key={index} task={task} />;
		});

		return(
			<div>
				{fetchedTasks}
			</div>
		)
	}
}


const mapStateToProps = state => {
	const tbt = state.taskboard.task;
	return {
		taskLoading: tbt.taskLoading,
		tasks: tbt.tasks,
		newTask: tbt.newTask,
		taskError: tbt.taskError,
		taskInfoText: tbt.taskInfoText,
		currentTasklistId: tbt.currentTasklistId,
		activeTasklist: tbt.activeTasklist
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);