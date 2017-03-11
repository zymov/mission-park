import React from 'react';
import { connect } from 'react-redux';
import ExecutorLabel from './executorLabel';
import InfoTag from './infoTag';
import { formatDate, repeatList } from '../../../utils'
import { toggleTask } from '../actions/taskActions';

class Task extends React.Component {
	constructor(props){
		super(props);
	}

	clickCheckbox(e){
		this.props.toggleTask(this.props.task);
	}

	editTask(){
		console.log(1);
	}

	render(){

		const { taskName, dueDate, priority, repeat, executors, accomplished, createTime } = this.props.task;

		var executorList = executors.map(function(item, index){
			return (
				<ExecutorLabel key={index} executor={item} removable={false}/>
			);
		});

		return(
			<div className="task">
				<div className={`task-priority priority-${priority}`}></div>
				<a className="check-box" onClick={this.clickCheckbox.bind(this)}>
					{ accomplished && <span className="glyphicon glyphicon-ok"></span> }
				</a>
				<div className="task-content" onClick={this.editTask.bind(this)}>
					<div className="task-basic">
							<p className="task-name">{taskName}</p>
							<div className="task-attr">
								<span className="task-duedate">{formatDate(dueDate)} 截止</span>
								{ !!repeat &&  <span className="task-repeat">{repeatList[repeat]}重复</span>}
							</div>
					</div>
					<div className="task-info">	
						<ul className="task-labels clearfix">
							<InfoTag tag="abc"/>
							<InfoTag tag="表歉意谁"/>
							<InfoTag tag={createTime} />
						</ul>
					</div>
				</div>
			</div>
		)
	}
	
}

const mapDispatchToProps = dispatch => ({
	toggleTask: task => { dispatch(toggleTask(task)); }
});

export default connect(null, mapDispatchToProps)(Task);