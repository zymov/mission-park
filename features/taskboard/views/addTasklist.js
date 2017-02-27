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
			priority: 1,	// 1: normal, 2: important, 3:very important
			executor: null
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
			      <div className="form-group" >
						  <div className="dropdown">
							  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							    优先级
							    <span className="caret"></span>
							  </button>
							  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
							    <li><a href="#">一般</a></li>
							    <li><a href="#">紧急</a></li>
							    <li><a href="#">非常紧急</a></li>
							  </ul>
							</div>
						  <div className='input-group date'>
                <input type='text' placeholder="列表截止日期" className="form-control" id='datetimepicker1'/>
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