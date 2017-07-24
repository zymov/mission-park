import React from 'react';
import { connect } from 'react-redux';
import Task from './task';
// import * as actionCreators from '../actions/taskActions';
import Spinner from '../../common/components/spinner';

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

		// if(this.props.taskLoading){
		// 	return (
		// 		<div className="task-container">
		// 			<Spinner />
		// 		</div>	
		// 	)
		// } 
		return(
			<div className="task-container">
				<Spinner show={this.props.taskLoading}/>
				{fetchedTasks}
			</div>
		)

		
	}
}

const mapStateToProps = state => {
	const tbt = state.taskboard.task;
	return {
		tasks: tbt.tasks,
		taskLoading: tbt.taskLoading
	}
}

// const mapDispatchToProps = dispatch => ({
	
// });

export default connect(mapStateToProps, null)(TaskContainer);