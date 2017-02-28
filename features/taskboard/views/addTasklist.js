import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import * as actionCreators from '../actions/tasklistActions';

class AddTasklist extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tasklistName: '',
			dueDate: null,
			priority: 0,	// 0: normal, 1: important, 2:very important
			executor: null
		}
		this.priorityList = ['一般', '紧急', '非常紧急'];
		this.labelStyle = {lineHeight: '34px', marginBottom: 0, marginRight: '20px', float: 'left'};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
	}

	componentDidMount(){
		$('#datetimepicker1').datetimepicker();
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
			projectId: this.props.projectId
		}
		this.props.actions.addTasklist(payload);
		this.setState({
			tasklistName: ''
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
					<div className="modal-body">
						<div className="form-group" >
		        	<input className="form-control" name="tasklistName" 
			        	placeholder="列表名称" 
			        	onChange={this.handleInputChange} 
			        	value={this.state.tasklistName} />
			      </div>
			      <div className="form-group clearfix" >
			      	<div className="col-md-6">
							  <div className='input-group date'>
							  	<label style={this.labelStyle}>截止时间</label>
	                <input type='text' placeholder="列表截止日期" className="form-control" id='datetimepicker1' 
	                	style={{width: '170px', float: 'right'}}/>
	              </div>
							</div>
						  <div className="col-md-6">
						  	<label style={this.labelStyle}>优先级</label>
							  <div className="dropdown" style={{float: 'left'}}>
							  	<button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={{background: 'none', border: 0, lineHeight: '34px'}}>
								    {this.priorityList[this.state.priority]}
								  </button>
								  <ul className="dropdown-menu" onClick={this.selectPriority} aria-labelledby="dropdownMenu1">
								    <li><a href="javascript:void(0);">一般</a></li>
								    <li><a href="javascript:void(0);">紧急</a></li>
								    <li><a href="javascript:void(0);">非常紧急</a></li>
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