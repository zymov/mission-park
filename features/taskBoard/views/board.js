import React from 'react';
import Card from './card';
// import Mod from './mod';
// import Dialog from '../../../components/modal_dialog/dialog';
import ModalBody from '../../../components/modal_dialog/modalBody';
import ModalWrapper from '../../../components/modal_dialog/modalWrapper';
import ModalHeader from '../../../components/modal_dialog/modalHeader';
import ModalFooter from '../../../components/modal_dialog/modalFooter';

export default class Board extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			taskContent: ''
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
		var taskContent = this.state.taskContent;
		console.log(taskContent);
	}

	render(){
		return(
			<div>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newTaskDialog">Launch demo modal</button>
				<ModalWrapper id="newTaskDialog" >
					<ModalHeader createTaskTo="x"/>
					<ModalBody handleInputChange={this.handleInputChange} taskContent={this.state.taskContent} />
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}
}