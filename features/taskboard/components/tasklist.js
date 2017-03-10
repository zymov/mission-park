import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchTask } from '../actions/taskActions';
import { formatDate } from '../../../utils';

class Tasklist extends React.Component {

	handleClick(e){
		e.stopPropagation();
		if(this.props.tasklist._id == this.props.currentTasklistId){return;}
		this.props.fetchTask(this.props.tasklist._id, this.props.index, this.props.tasklist.tasklistName);
	}

	componentDidMount(){
		if(this.props.index == 0){
			this.props.fetchTask(this.props.tasklist._id, 0, this.props.tasklist.tasklistName);
		}
	}

	render(){

		const { _id, tasklistName, createTime, dueDate, priority } = this.props.tasklist;

		return(
			<div onClick={this.handleClick.bind(this)} 
			className={`list-group-item tasklist clearfix ${this.props.activeTasklist == this.props.index ? 'current-tasklist' : ''}`}>
				<div className={`tasklist-priority priority-${priority}`}></div>
	      <h4 title={tasklistName} className="list-group-item-heading">{tasklistName}</h4>
	      <label className="label label-danger" >截止日期: {formatDate(dueDate)}</label>
		    <div className="label-wrapper">
		    	<span className="badge">标签1</span>
			    <span className="badge">label2</span>
			    <span className="badge">label3</span>
			    <span className="badge">labe2</span>
			    <span className="badge">lab标签1e2labe2</span>
		    </div>
	      <small className="tasklist-footer">创建时间: {formatDate(createTime)}</small>
		  </div>
		);
	}
}

const mapStateToProps = state => ({
	currentTasklistId: state.taskboard.task.currentTasklistId,
	activeTasklist: state.taskboard.task.activeTasklist
});

const mapDispatchToProps = dispatch => ({
	fetchTask: (tasklistId, index, tasklistName) => dispatch(fetchTask(tasklistId, index, tasklistName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);