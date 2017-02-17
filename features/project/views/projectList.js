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
		const { newProject, isFetching, projects, errors } = this.props;

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

		if(newProject){
			if(contentText == '') {
				contentText = <ProjectCard project={newProject} />;
			} else {
				contentText.unshift(<ProjectCard project={newProject} />);
			}
			
		}

		return(
				<div className="container card-deck">
					<ProjectToolbar />
					{contentText}
			  </div>
		)
	}
}

const mapStateToProps = (state) => ({
	isFetching: state.project.isFetching,
	projects: state.project.projects,
	errors: state.project.errors,
	newProject: state.project.newProject
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);