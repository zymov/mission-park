import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../common/components/modal_dialog';
import Dropdown from './dropdown/dropdown';
import { addTasklist } from '../actions/tasklistActions';
import { priorityList, priorityColors } from '../constants/constValue';
import { validateTasklistForm } from '../../../utils/validations';

class AddTasklist extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tasklistName: '',
			dueDate: '',
			priority: 0,	// 0: normal, 1: important, 2:very important
			inputError: {}
		}; 

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.selectPriority = this.selectPriority.bind(this);

		this.priorityDropdown = {
			menuList: [
				{name: '一般', style: {color: '#555'}}, 
				{name: '紧急', style: {color: '#ffaf38'}}, 
				{name: '非常紧急', style: {color: "#ff4f3e"}}],
			btnId: 'priorityDropdown',
			handleClick: this.selectPriority
		}
	}

	componentDidMount(){
		$('#tasklistDueDate').datetimepicker();
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value,
			inputError: Object.assign({}, this.state.inputError, {
				[name]: false
			})
		});
	}

	handleSubmit(){
		var payload = {
			tasklistName: this.state.tasklistName,
			projectId: this.props.projectId,
			priority: this.state.priority,
			dueDate: this.state.dueDate
		}
		let validation = validateTasklistForm(payload);
		if(!validation.isFormValid){
			this.setState({
				inputError: validation.errors
			});
			return;
		}
		this.props.addTasklist(payload);
		this.setState({
			tasklistName: '',
			priority: 0,
			dueDate: '',
			inputError: {}
		});
		$('#addTasklist').click();
	}

	selectPriority(event){
		const target = event.target;
		if(!target.text) { return; }
		const priority = priorityList.indexOf(target.text);
		this.setState({
			priority: priority
		});
	}

	render(){

		return(
			<div className="toolbar-btn">
				<TriggerBtn dataTarget="#addTasklist" btnName="添加新任务列表"/>
				<ModalWrapper id="addTasklist" >
					<ModalHeader createTasklist />
					<div className="modal-body clearfix">
						<div className="row">
							<div className="col-md-12 form-group" >
			        	<input className={`form-control ${this.state.inputError.tasklistName ? 'error-input' : ''}`} name="tasklistName" 
				        	placeholder="列表名称" 
				        	onChange={this.handleInputChange} 
				        	value={this.state.tasklistName} />
				      </div>
				     </div>
				     <div className="row">

				      	<div className="col-md-6 form-group">
								  <div className='date'>
								  	<label>截止时间</label>
		                <input type='text' placeholder="点击设置" className={`form-control ${this.state.inputError.dueDate ? 'error-input' : ''}`} name='dueDate' id='tasklistDueDate' 
		                	onBlur={this.handleInputChange} value={this.state.dueDate}/>
		              </div>
								</div>

							  <div className="col-md-6 form-group">
							  	<label>优先级</label>
							  	<Dropdown dropdown={this.priorityDropdown} 
										btnStyle={{color: priorityColors[this.state.priority]}} 
										btnName={priorityList[this.state.priority]} />
				     		 </div>

				    </div>
		      </div>
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => ({
	addTasklist: (payload) => { dispatch(addTasklist(payload)); }
});

export default connect(null, mapDispatchToProps)(AddTasklist);