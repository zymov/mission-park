import React from 'react';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import { addTaskList } from '../actions';

class AddTaskList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tasklistName: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		this.props.addTaskList(this.state.tasklistName);
	}

	render(){
		return(
			<div>
				<TriggerBtn dataTarget="#newTaskListDialog" />
				<ModalWrapper id="newTaskListDialog" >
					<ModalHeader createList={true} createTo="x"/>
					<div className="modal-body">
						<div className="form-group" >
		        	<input className="form-control" name="tasklistName" 
			        	placeholder="列表名称" 
			        	onChange={this.handleInputChange} 
			        	value={this.state.tasklistName} />
			      </div>
		      </div>
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}

}

const mapDispatchToProps = dispatch => ({
	addTaskList: tasklistName => dispatch(addTaskList(tasklistName))
});

export default connect(null, mapDispatchToProps)(AddTaskList);