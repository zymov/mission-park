import React from 'react';
import { connect } from 'react-redux';
// import { formatDate, getLocaleDateR, repeatList, taskToolMenuList } from '../../../utils'
import { formatDate, getLocaleDateR } from '../../../utils'
import { repeatList, taskToolMenuList } from '../constants/constValue';
import { toggleTask, showTaskDetail, deleteTask } from '../actions/taskActions';
import TriggerBtn from '../../common/components/modal_dialog/triggerBtn';
import Dropdown from './dropdown/dropdown';

class Task extends React.Component {
	constructor(props){
		super(props);

		this.taskToolDropdown = {
			menuList: taskToolMenuList,
			btnId: 'taskToolDropdown',
			handleClick: this.clickTaskTool.bind(this)
		}
	}

	clickCheckbox(e){
		this.props.toggleTask(this.props.task, this.props.projectId);
	}

	showTask(){
		this.props.showTaskDetail(this.props.task);
	}

	clickTaskTool(e){
		if(e.target.name == '删除'){
			this.props.deleteTask(this.props.task._id, this.props.tasklistId, this.props.projectId);
		}
	}

	render(){

		const { _id, taskName, description, dueDate, priority, repeat, tags, accomplished, createTime } = this.props.task;

		let delay = (Date.parse(getLocaleDateR(new Date(dueDate))) - Date.now()) < 0 ? 'delay' : '';

		let tagsList = tags.map(function(item, index){
			return (
				<li key={index}><span><span className="tag-dot"></span>{item}</span></li>
			);
		});

		return(
			<div id={_id} className={`task ${accomplished ? 'done' : ''}`} >
				<div className={`task-priority priority-${priority}`}></div>
				<a className="check-box" onClick={this.clickCheckbox.bind(this)}>
					{ accomplished && <span className="glyphicon glyphicon-ok"></span> }
				</a>
				<div className="task-content" onClick={this.showTask.bind(this)}>
					<div className="task-basic">
							<p className="task-name" title={taskName} >{taskName}</p>
							<div className="task-attr">
								{ !!dueDate && <span className={`task-duedate ${delay}`}>{formatDate(dueDate)} 截止</span>}
								{ !!repeat &&  <span className="task-repeat">{repeatList[repeat]}重复</span>}
							</div>
					</div>
					<div className="task-info">	
						<ul className="task-tags clearfix">
							{tagsList}
						</ul>
					</div>
				</div>
				<div className="task-tools">
					<Dropdown dropdown={this.taskToolDropdown} btnStyle={{}} 
						btnName={<i className="glyphicon glyphicon-option-vertical"></i>} />
				</div>
				
				<TriggerBtn dataTarget={`#taskDetail${this.props.task._id}`} btnName="" display="none" />
			</div>
		)
	}

}

// const mapStateToProps = state => ({
// 	taskDetail: state.taskboard.task.taskDetail
// })

const mapDispatchToProps = dispatch => ({
	toggleTask: (task, projectId) => { dispatch(toggleTask(task, projectId)); },
	showTaskDetail: task => { dispatch(showTaskDetail(task)); },
	deleteTask: (taskId, tasklistId, projectId) => { dispatch(deleteTask(taskId, tasklistId, projectId)); }
});

export default connect(null, mapDispatchToProps)(Task);