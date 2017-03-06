import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../components/modal_dialog';
import Dropdown from './dropdown/dropdown';
import DropdownInput from './dropdown/dropdownInput';
// import * as actionCreators from '../actions';
import { addTask, getExecutorDropdown, closeExecutorDropdown, changeExecutors } from '../actions/taskActions';

class AddTask extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			taskName: '',
			dueDate: '',
			priority: 0,
			description: '',
			executor: '',
			repeat: 0
		}

		this.priorityList = ['一般', '紧急', '非常紧急'];
		this.priorityColors = ['#555', '#ffaf38', '#ff4f3e'];

		this.repeatList = ['不重复', '每小时', '每天', '每周', '每月', '每年'];

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
		this.selectRepeat = this.selectRepeat.bind(this);
		this.documentClick = this.documentClick.bind(this);
		this.changeExecutors = this.changeExecutors.bind(this);

		this.priorityDropdown = {
			menulist: [
				{name: '一般', style: {color: '#555'}}, 
				{name: '紧急', style: {color: '#ffaf38'}}, 
				{name: '非常紧急', style: {color: "#ff4f3e"}}],
			btnId: 'priorityDropdown',
			handleClick: this.selectPriority
		}

		this.repeatDropdown = {
			menulist: [ {name: '不重复'}, {name: '每小时'}, {name: '每天'}, {name: '每周'}, {name: '每月'}, {name: '每年'} ],
			btnId: 'repeatDropdown',
			handleClick: this.selectRepeat
		}
	}

	componentWillMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentDidMount(){
		$('#taskDueDate').datetimepicker();
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		//ReactDOM.findDOMNode(this)
		if($('#executorDropdown')[0].contains(e.target)){
			return;
		} else {
			this.props.closeExecutorDropdown();
		}
	}

	dropdownClick(e){
		if(e.target.nodeName == 'A'){
			
		} else { return; }
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	selectPriority(event){
		const target = event.target;
		const priority = this.priorityList.indexOf(target.text);
		this.setState({
			priority: priority
		});
	}

	selectRepeat(event){
		const target = event.target;
		const repeat = this.repeatList.indexOf(target.text);
		this.setState({
			repeat: repeat
		});
	}

	handleSubmit(){
		var payload = {
			taskName: this.state.taskName,
			tasklistId: this.props.tasklistId,
			description: this.state.description,
			priority: this.state.priority,
			dueDate: this.state.dueDate,
			executor: this.state.executor
		}
		this.props.addTask(payload);
		this.setState({
			taskName: ''
		});
		this.props.closeExecutorDropdown();
		$('#newTask').click();	// use state?
	}

	changeExecutors(){
		this.props.getExecutorDropdown(this.props.projectId);
	}

	render(){
		return(
			<div>
				<TriggerBtn dataTarget="#newTask" />
				<ModalWrapper id="newTask" >
					<ModalHeader createTaskTo={this.props.currentTasklistName}/>
					<div className="modal-body">

						<div className="row">
							<div className="col-md-12 form-group" >
			        	<input className="form-control" name="taskName" 
				        	placeholder="任务内容" 
				        	onChange={this.handleInputChange} 
				        	value={this.state.taskName} />
				      </div>
				    </div>
			    	
			    	<div className="row">
			    		<div className="col-md-12 form-group">
				    		<textarea className="form-control" name="description" 
				        	placeholder="任务简介" rows="3" 
				        	onChange={this.handleInputChange} 
				        	value={this.state.description}></textarea>
			        </div>
			    	</div>
			      
			      <div className="row">
			      	<div className="col-md-4 form-group">
							  <div className='input-group date'>
							  	<label>截止时间</label>
	                <input type='text' placeholder="点击设置" title="点击设置" className="form-control" name='dueDate' id='taskDueDate' 
	                	 onBlur={this.handleInputChange} value={this.state.dueDate}/>
	              </div>
							</div>

						  <div className="col-md-4 form-group">
						  	<label>优先级</label>
								<Dropdown dropdown={this.priorityDropdown} 
									btnStyle={{color: this.priorityColors[this.state.priority]}} 
									btnName={this.priorityList[this.state.priority]} />
			     		</div>

	     				<div className="col-md-4 form-group">
		     				<label>重复</label>
		     				<Dropdown dropdown={this.repeatDropdown} 
		     					btnStyle={{color: '#555'}}
									btnName={this.repeatList[this.state.repeat]} />
		     			</div>
		     		</div>

		     		<div className="row executor-row">
		     			<label>执行者</label>
		     			<ul className="executor-list clearfix">
		     				<li className="removable"><a title="zymokey">
		     							<img src="/static/imgs/101.png" />zymokey</a>
		     						<span className="remove-executor glyphicon glyphicon-remove"></span></li>
								<li className="removable"><a title="按时大大发多少公司">
		     							<img src="/static/imgs/101.png" />按时大大发多少公司</a>
		     							<span className="remove-executor glyphicon glyphicon-remove"></span></li>
		     				<li className="removable"><a title="Tai Lopez">
		     							<img src="/static/imgs/101.png" />Tai Lopez</a>
		     							<span className="remove-executor glyphicon glyphicon-remove"></span></li>
		     				<li className="removable"><a title="只是代售点">
		     							<img src="/static/imgs/100.png" />只是代售点</a>
		     							<span className="remove-executor glyphicon glyphicon-remove"></span></li>
		     				<li className="removable"><a title="只是代售点">
		     							<img src="/static/imgs/100.png" />只是代售点</a>
		     							<span className="remove-executor glyphicon glyphicon-remove"></span></li>
		     				<li className="removable"><a title="只是代售点">
		     							<img src="/static/imgs/100.png" />只是代售点</a>
		     							<span className="remove-executor glyphicon glyphicon-remove"></span></li>
		     				<li id="executorDropdown" onClick={this.changeExecutors} >
	     						<a title="add new executor" 
	     								className="new-executor glyphicon glyphicon-plus"></a>
		     					{ this.props.showExecutorDropdown && <DropdownInput onClick={this.dropdownClick} executors={this.props.executors} />}
		     				</li>
		     			</ul>
		     		</div>

		      </div>
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentTasklistName: state.taskboard.task.currentTasklistName,
	showExecutorDropdown: state.taskboard.task.showExecutorDropdown,
	executors: state.taskboard.task.executors
})

const mapDispatchToProps = (dispatch) => {
	return({
		addTask: taskname => { dispatch(addTask(taskname)); },	//addTask(x) returns a function
		getExecutorDropdown: projectId => { dispatch(getExecutorDropdown(projectId)); },
		closeExecutorDropdown: () => { dispatch(closeExecutorDropdown()); },
		addExecutor: (projectId) => { dispatch(addExecutor(projectId)); },
		removeExecutor: (projectId) => { dispatch(removeExecutor(projectId)); }
	})
}

// ({
// 	actions: bindActionCreators(actionCreators, dispatch)
// })

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);

