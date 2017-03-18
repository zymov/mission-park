import React from 'react';
import { connect } from 'react-redux';
import { formatDate, repeatList } from '../../../utils'
import { toggleTask, showTaskDetail } from '../actions/taskActions';
import TriggerBtn from '../../common/components/modal_dialog/triggerBtn';

class Task extends React.Component {
	constructor(props){
		super(props);
	}

	clickCheckbox(e){
		this.props.toggleTask(this.props.task);
	}

	showTask(){
		this.props.showTaskDetail(this.props.task);
	}

	render(){

		const { taskName, dueDate, priority, repeat, tags, accomplished, createTime } = this.props.task;

		let tagsList = tags.map(function(item, index){
			return (
				<li key={index}><span><span className="tag-dot"></span>{item}</span></li>
			);
		});

		return(
			<div className="task">
				<div className={`task-priority priority-${priority}`}></div>
				<a className="check-box" onClick={this.clickCheckbox.bind(this)}>
					{ accomplished && <span className="glyphicon glyphicon-ok"></span> }
				</a>
				<div className="task-content" onClick={this.showTask.bind(this)}>
					<div className="task-basic">
							<p className="task-name">{taskName}</p>
							<div className="task-attr">
								<span className="task-duedate">{formatDate(dueDate)} 截止</span>
								{ !!repeat &&  <span className="task-repeat">{repeatList[repeat]}重复</span>}
							</div>
					</div>
					<div className="task-info">	
						<ul className="task-tags clearfix">
							{tagsList}
						</ul>
					</div>
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
	toggleTask: task => { dispatch(toggleTask(task)); },
	showTaskDetail: task => { dispatch(showTaskDetail(task)); }
});

export default connect(null, mapDispatchToProps)(Task);