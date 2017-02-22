import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Task from './task';
import AddTask from './addTask';
import * as actionCreators from '../actions';

class TaskContainer extends React.Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.actions.fetchTask(this.props.tasklistId);
	}

	render(){
		const { isLoading, tasks, newTask, isError, infoText, currentTasklistId } = this.props;

		var fetchedTasks = [];

		fetchedTasks = tasks.map(function(task, index){
			return <Task key={index} task={task} />;
		});

		return(
			<div className="col-md-8">
				<div className="btn-group" role="group" aria-label="Basic example">
			  	<AddTask tasklistId={currentTasklistId} />
				  <button type="button" className="btn btn-secondary">btn2</button>
				  <button type="button" className="btn btn-secondary">btn3</button>
				</div>
				{fetchedTasks}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	isLoading: state.task.isLoading,
	tasks: state.task.tasks,
	newTask: state.task.newTask,
	isError: state.task.isError,
	infoText: state.task.infoText,
	currentTasklistId: state.task.currentTasklistId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);