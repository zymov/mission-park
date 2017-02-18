import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectToolbar from './projectToolbar';
import ProjectCard from './projectCard';

import * as actionCreators from '../actions';

class ProjectList extends React.Component {

	componentWillMount(){
		this.props.actions.fetchProject();
	}

	render(){
		const { newProject, fetchingProject, projects, fetchingErrors, addingProjectErrors } = this.props;

		var fetchedProject = [], infoText = '';
		if(fetchingProject){
			infoText = "fetching projects..."
		} else if (fetchingErrors){
			infoText = `<div class="alert alert-danger" role="alert">
			    						<strong>Oh snap!</strong> Error: ${fetchingErrors}.</div>`;
		} else if (addingProjectErrors){
			infoText = `<div class="alert alert-danger" role="alert">
			    						<strong>Oh snap!</strong> Error: ${addingProjectErrors}.</div>`;
		} 
		// else if (!projects || projects.length == 0){
		// 	infoText = '';
		// } 

		if(projects && projects.length > 0){
			fetchedProject = projects.map(function(project, index){
				return (
					<ProjectCard key={index} project={project} />
				)
			});	
		}

		if(newProject && !fetchingProject){
				fetchedProject.unshift(<ProjectCard project={newProject} />);
		}

		return(
				<div className="container card-deck">
					<ProjectToolbar />
					{infoText}
					{fetchedProject}
			  </div>
		)
	}
}

const mapStateToProps = (state) => ({
	fetchingProject: state.project.fetchingProject,
	projects: state.project.projects,
	fetchingErrors: state.project.fetchingErrors,
	addingProjectErrors: state.project.addingProjectErrors,
	newProject: state.project.newProject
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);