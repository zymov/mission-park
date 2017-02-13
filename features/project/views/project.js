import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import ProjectCard from './projectCard';

import {addProject, fetchProject} from '../actions';

class Project extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			projectName: '',
			description: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		this.props.fetchProject();
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
			projectName: this.state.projectName,
			description: this.state.description,
			token: localStorage.getItem('token')
		}

		this.props.addProject(payload);
	}

	render(){
		const { isFetching, projects, errors } = this.props;

		var contentText = '';
		if(isFetching){
			contentText = "fetching projects..."
		} else if (errors){
			contentText = '<div class="alert alert-danger" role="alert">' 
			    					+ `<strong>Oh snap!</strong> Error: ${errors}.</div>`;
		} else if (!projects || projects.length == 0){
			contentText = '';
		} else {
			contentText = projects.map(function(project, index){
				return (
					<ProjectCard key={index} project={project} />
				)
			});	
		}

		return(
				<div className="container card-deck">
					<button type="button" className="btn btn-primary btn-lg btn-block" 
						data-toggle="modal" 
						data-target="#addProject">Add Project</button>
					{contentText}
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

const mapStateToProps = (state) => ({
	isFetching: state.project.isFetching,
	projects: state.project.projects,
	errors: state.project.errors
});

const mapDispatchToProps = (dispatch) => {
	return ({
		addProject: (payload) => { dispatch(addProject(payload)); },
		fetchProject: () => dispatch(fetchProject())
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);