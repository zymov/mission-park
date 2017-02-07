import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader, ModalBody, ModalFooter } from '../../../components/modal_dialog';
// import * as actionCreators from '../actions';
import { addTask } from '../actions';

class Mod extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			taskName: ''
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
		this.props.addTask(this.state.taskName);
	}

	render(){
		return(
			<div>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newTaskDialog">Launch demo modal</button>
				<ModalWrapper id="newTaskDialog" >
					<ModalHeader createTaskTo="x"/>
					<ModalBody handleInputChange={this.handleInputChange} taskName={this.state.taskName} />
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return({
		addTask: (x) => { dispatch(addTask(x)); }	//addTask(x) returns a function
	})
}

// ({
// 	actions: bindActionCreators(actionCreators, dispatch)
// })

export default connect(null, mapDispatchToProps)(Mod);

