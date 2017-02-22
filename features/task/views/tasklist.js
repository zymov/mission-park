import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchTask } from '../actions';

class Tasklist extends React.Component {

	handleClick(){
		this.props.fetchTask(this.props.tasklist._id);
	}

	render(){

		const { tasklistName, createTime } = this.props.tasklist;

		return(
			<a href="javascript:void(0);" onClick={this.handleClick.bind(this)} className="list-group-item list-group-item-action flex-column align-items-start ">
		    <div className="d-flex w-100 justify-content-between">
		      <h5 className="mb-1">{this.props.tasklist.tasklistName}</h5>
		      <small>{createTime}</small>
		    </div>
		    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		    <small>Donec id elit non mi porta.</small>
		  </a>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	fetchTask: tasklistId => dispatch(fetchTask(tasklistId))
});

export default connect(null, mapDispatchToProps)(Tasklist);