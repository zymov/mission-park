import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import Example from './autoSuggest';
import * as actionCreators from '../actions/tasklistActions';

class AddTasklist extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tasklistName: '',
			dueDate: '',
			priority: 0	// 0: normal, 1: important, 2:very important
		}; 
		this.priorityList = ['一般', '紧急', '非常紧急'];
		this.priorityColors = ['#555', '#ffaf38', '#ff4f3e'];
		this.labelStyle = {lineHeight: '34px', marginBottom: 0, marginRight: '20px', float: 'left'};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
	}

	componentDidMount(){
		$('#dueDate').datetimepicker();
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(){
		var payload = {
			tasklistName: this.state.tasklistName,
			projectId: this.props.projectId,
			priority: this.state.priority,
			dueDate: this.state.dueDate
		}
		this.props.actions.addTasklist(payload);
		this.setState({
			tasklistName: '',
			priority: 0,
			dueDate: ''
		});
		$('#addTasklist').click();
	}

	selectPriority(event){
		const target = event.target;
		const priority = this.priorityList.indexOf(target.text);
		this.setState({
			priority: priority
		});
	}

	render(){

		return(
			<div>
				<TriggerBtn dataTarget="#addTasklist" />
				<ModalWrapper id="addTasklist" >
					<ModalHeader createTasklistTo='project'/>
					<div className="modal-body clearfix">
						<div className="row">
							<div className="col-md-12 form-group" >
			        	<input className="form-control" name="tasklistName" 
				        	placeholder="列表名称" 
				        	onChange={this.handleInputChange} 
				        	value={this.state.tasklistName} />
				      </div>
				     </div>
				     <div className="row">

				      	<div className="col-md-6 form-group">
								  <div className='input-group date'>
								  	<label style={this.labelStyle}>截止时间</label>
		                <input type='text' placeholder="列表截止日期" className="form-control" name='dueDate' id='dueDate' 
		                	style={{width: '170px'}} onBlur={this.handleInputChange} value={this.state.dueDate}/>
		              </div>
								</div>

							  <div className="col-md-6 form-group">
							  	<label style={this.labelStyle}>优先级</label>
								  <div className="dropdown" style={{float: 'left'}}>
								  	<button className="dropdown-toggle" type="button" id="priorityDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={{background: 'none', border: 0, lineHeight: '32px', color: this.priorityColors[this.state.priority]}}>
									    {this.priorityList[this.state.priority]}
									  </button>
									  <ul className="dropdown-menu" onClick={this.selectPriority} aria-labelledby="priorityDropdown">
									    <li><a href="javascript:void(0);" style={{color: '#555'}}>一般</a></li>
									    <li><a href="javascript:void(0);" style={{color: '#ffaf38'}}>紧急</a></li>
									    <li><a href="javascript:void(0);" style={{color: '#ff4f3e'}}>非常紧急</a></li>
									  </ul>
								  </div>
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
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(AddTasklist);