import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchTask } from '../actions/taskActions';

class Tasklist extends React.Component {

	handleClick(e){
		e.stopPropagation();
		this.props.fetchTask(this.props.tasklist._id);
	}

	render(){

		const { _id, tasklistName, createTime, dueDate, priority } = this.props.tasklist;

		return(
			<div onClick={this.handleClick.bind(this)} className="list-group-item tasklist clearfix">
				<div className="tasklist-priority priority-1"></div>
	      <h4 title={tasklistName} className="list-group-item-heading">{tasklistName}</h4>
	      <label className="label label-warning" >优先级: {priority}</label>
	      <label className="label label-danger" >截止日期: {dueDate}</label>
		    <div className="label-wrapper">
		    	<span className="badge">标签1</span>
			    <span className="badge">label2</span>
			    <span className="badge">label3</span>
			    <span className="badge">labe2</span>
			    <span className="badge">lab标签1e2labe2</span>
		    </div>
	      <small className="tasklist-footer">创建时间: {createTime}</small>
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchTask: tasklistId => dispatch(fetchTask(tasklistId))
});

export default connect(null, mapDispatchToProps)(Tasklist);