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
		const { newProject, isLoading, projects, isError, infoText } = this.props;

		var fetchedProject = [];
		
		fetchedProject = projects.map(function(project, index){
			return <ProjectCard key={index} project={project} />;
		});	

		return(
				<div id="project-list" className="container">
					<ProjectToolbar />
					{isLoading && <div className="container col-md-9 alert alert-default" role="alert">{infoText}.</div>}
					{isError && <div className="container col-md-9 alert alert-danger" role="alert">{infoText}.</div>}
					<div className="row">
						{fetchedProject}
					</div>
			  </div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.project.isLoading,
	projects: state.project.projects,
	isError: state.project.isError,
	newProject: state.project.newProject,
	infoText: state.project.infoText
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);