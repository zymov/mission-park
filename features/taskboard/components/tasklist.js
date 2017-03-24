import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteTasklist/*fetchTasklistStatus*/ } from '../actions/tasklistActions';
import { fetchTasks } from '../actions/taskActions';
import { formatDate, getLocaleDateR, tasklistToolMenuList } from '../../../utils';
import Dropdown from './dropdown/dropdown';

class Tasklist extends React.Component {

	constructor(props){
		super(props);

		this.tasklistToolDropdown = {
			menuList: tasklistToolMenuList,
			btnId: 'tasklistToolDropdown',
			handleClick: this.clickTasklistTool.bind(this)
		}
	}

	handleClick(e){
		e.stopPropagation();
		if(this.props.tasklist._id == this.props.currentTasklistId){return;}
		this.props.fetchTasks(this.props.tasklist._id, this.props.index, this.props.tasklist.tasklistName);
	}

	// componentWillMount(){
	// 	this.props.fetchTasklistStatus(this.props.tasklist._id);

	// }


	clickTasklistTool(e){
		if(e.target.name == '删除'){
			this.props.deleteTasklist(this.props.tasklist._id);
		}
	}


	render(){

		const { _id, tasklistName, createTime, dueDate, priority } = this.props.tasklist;

		const interval = Date.parse(getLocaleDateR(new Date(dueDate))) - Date.now();

		let delay = '';
		if(interval < 0){
			delay = 'delay';
		} else if(900000 > interval > 0){
			delay = 'almost-delay';
		}

		return(
			<div onClick={this.handleClick.bind(this)} 
			className={`list-group-item tasklist clearfix ${this.props.activeTasklist == this.props.index ? 'current-tasklist' : ''}`}>
				<div className={`tasklist-priority priority-${priority}`}></div>
	      <h4 title={tasklistName} className="list-group-item-heading">{tasklistName}</h4>
	      <div className="tasklist-attr clearfix">
	      	{/*<span className={`tasklist-dueDate ${delay}`}>{formatDate(dueDate)} 截止</span>*/}
	      </div>
				<div className="tasklist-tools">
					<Dropdown dropdown={this.tasklistToolDropdown} btnStyle={{}} 
						btnName={<i className="glyphicon glyphicon-option-vertical"></i>} />
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
	fetchTasks: (tasklistId, index, tasklistName) => { dispatch(fetchTasks(tasklistId, index, tasklistName)); },
	deleteTasklist: (tasklistId) => { dispatch(deleteTasklist(tasklistId)); }
	// fetchTasklistStatus: (tasklistId) => { dispatch(fetchTasklistStatus(tasklistId)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);