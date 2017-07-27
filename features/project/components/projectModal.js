import React from 'react';
import { connect } from 'react-redux';
import { addProject, editProject } from '../actions';
import { validateProjectForm } from '../../../utils/validations';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../common/components/modal_dialog';

class ProjectModal extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			projectName: '',
			description: '',
			inputError: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.project.projectName){
			this.setState({
				projectName: nextProps.project.projectName,
				description: nextProps.project.description
			});
		}
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

	handleSubmit(event){

		let payload = {
			projectName: this.state.projectName,
			description: this.state.description,
			token: localStorage.getItem('token')
		}
		let validation = validateProjectForm(payload);
		if(!validation.isFormValid){
			this.setState({
				inputError: validation.errors
			});
			return;
		}
		if(this.props.editingProject){
			payload.projectId = this.props.editingProject._id;
			this.props.editProject(payload);
		} else {
			this.props.addProject(payload);	
		}
		this.setState({
			projectName: '',
			description: '',
			inputError: {}
		});
		if(this.props.editingProject){
			$('#editProject').click();
		} else {
			$('#addProject').click();
		}
		// this.props.actions.fetchProject();
	}

	render(){

		return (
			<ModalWrapper id={this.props.createProject ? 'addProject' : 'editProject' } >
				<ModalHeader {...this.props} />
				<div className="modal-body">
					<div className="form-group" >
		        <input className={`form-control ${this.state.inputError.projectName ? 'error-input' : ''}`} name="projectName" 
			        placeholder="项目名称" 
			        onChange={this.handleInputChange} 
			        value={this.state.projectName} />
			    </div>
			    <div className="form-group" >
			      <textarea className="form-control" name="description"  
			        placeholder="项目简介（选填）" rows="2" 
			        onChange={this.handleInputChange} 
			        value={this.state.description}></textarea>
		      </div>
	      </div>
				<ModalFooter handleSubmit={this.handleSubmit} />
			</ModalWrapper>
		)
	}

}

const mapStateToProps = state => ({
	editingProject : state.project.editingProject
});

const mapDispatchToProps = dispatch => ({
	addProject: payload => dispatch(addProject(payload)),
	editProject: payload => dispatch(editProject(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);