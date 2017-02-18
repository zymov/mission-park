import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Mod from './mod';
import Tasklist from './tasklist';
import AddTasklist from './addTasklist';
import TasklistContainer from './tasklistContainer';
import Task from './task';
import TaskContainer from './taskContainer';

import * as actionCreators from '../actions';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.actions.fetchTasklist();
	}

	render(){

		const { fetchingTasklist, addingTasklist, addingTask, tasklists, newTasklist, newTask, addingTasklistErrors, addingTaskErrors, fetchingTasklistErrors } = this.props;

		var fetchedTaskList = [], infoText = '';

		if(fetchingTasklist){
			infoText = 'fething task list...';
		} else if (addingTasklist){
			infoText = 'adding new task list...';
		} else if (addingTask){
			infoText = 'adding new task...';
		} else if (fetchingTasklistErrors){
			infoText = `<div className="alert alert-danger" role="alert">
			    				<strong>Oh snap!</strong> Error: ${fetchingTasklistErrors}.</div>`;
		} else if (addingTasklistErrors){
			infoText = `<div className="alert alert-danger" role="alert">
			    				<strong>Oh snap!</strong> Error: ${addingTasklistErrors}.</div>`;
		} else if (addingTaskErrors){
			infoText = `<div className="alert alert-danger" role="alert">
			    				<strong>Oh snap!</strong> Error: ${addingTaskErrors}.</div>`;
		} 

		if (tasklists && tasklists.length > 0){
			fetchedTaskList = tasklists.map(function(tasklist, index){
				return <Tasklist key={index} tasklist={tasklist} />
			});
		}

		if(newTasklist && !fetchingTasklist){
			fetchedTaskList.unshift(<Tasklist tasklist={newTasklist} />);
		}



		return(
				<div className="container taskboard">
					{infoText}
					<div className="row">
						<div className="col-md-4">
							<div className="btn-group" role="group" aria-label="Basic example">
							  <AddTasklist />
							  <button type="button" className="btn btn-secondary">btn2</button>
							  <button type="button" className="btn btn-secondary">btn3</button>
							</div>
							<TasklistContainer>
								{fetchedTaskList}
							</TasklistContainer>
						</div>
						<div className="col-md-8">
							<div className="btn-group" role="group" aria-label="Basic example">
						  	<Mod />
							  <button type="button" className="btn btn-secondary">btn2</button>
							  <button type="button" className="btn btn-secondary">btn3</button>
							</div>
							<TaskContainer>
								<Task />
								<Task />
								<Task />
							</TaskContainer>
						</div>
					</div>
				</div>
		)
	}
}

const mapStateToProps = state => ({
	fetchingTasklist: state.task.fetchingTasklist,
	addingTasklist: state.task.addingTasklist,
	addingTask: state.task.addingTask,

	tasklists: state.task.tasklists,
	newTasklist: state.task.newTasklist,
	newTask: state.task.newTask,

	addingTasklistErrors: state.task.addingTasklistErrors,
	addingTaskErrors: state.task.addingTaskErrors,
	fetchingTasklistErrors: state.task.fetchingTasklistErrors
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);