import React from 'react';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import { addProject } from '../actions';

class ProjectToolbar extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			projectName: '',
			description: ''
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

	handleSubmit(event){

		var payload = {
			projectName: this.state.projectName,
			description: this.state.description,
			token: localStorage.getItem('token')
		}

		this.props.addProject(payload);
		this.setState({
			projectName: '',
			description: ''
		});
		$('#addProject').click();
	}

	render(){
		return(
			<div className="container" style={{marginTop: '20px'}}>
				<button type="button" className="btn btn-primary btn-lg btn-block" 
					data-toggle="modal" 
					data-target="#addProject">Add Project</button>
				<ModalWrapper id="addProject" >
					<ModalHeader createTaskTo="x" />
					<div className="modal-body">
						<div className="form-group" >
			        <input className="form-control" name="projectName" 
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
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => {
	return ({
		addProject: (payload) => { dispatch(addProject(payload)); }
	});
};

export default connect(null, mapDispatchToProps)(ProjectToolbar);