import React from 'react';
import { connect } from 'react-redux';
import ProjectToolbar from './projectToolbar';
import ProjectCard from './projectCard';

import {fetchProject} from '../actions';

class Project extends React.Component {

	componentWillMount(){
		this.props.fetchProject();
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
					<ProjectToolbar />
					{contentText}
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
		fetchProject: () => dispatch(fetchProject())
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);