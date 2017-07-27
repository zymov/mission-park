import React from 'react';
import { connect } from 'react-redux';
import ProjectToolbar from '../components/projectToolbar';
import ProjectCard from '../components/projectCard';
import Notification from '../../common/components/notification/notification';
import NotificationsContainer from '../../common/components/notification/notificationsContainer'
import { isEmptyObject } from '../../../utils';
import { fetchProject } from '../actions';
import ProjectModal from '../components/projectModal';

class ProjectList extends React.Component {

	componentWillMount(){
		this.props.fetchProject();
	}

	render(){
		const { newProject, isLoading, projects, editingProject, isError, infoText, showNotification } = this.props;

		var fetchedProject = [];
		
		fetchedProject = projects.map(function(project){
			return <ProjectCard key={project._id} project={project} />;
		});	

		return(
				<div id="project-list" className="container">
					<NotificationsContainer>
						{(!isEmptyObject(infoText) && showNotification ) && <Notification notification={infoText} />}
					</NotificationsContainer>
					<ProjectToolbar />
					<div className="row">
						{fetchedProject}
					</div>
					<ProjectModal editProject project={editingProject ? editingProject : {}} />
			  </div>
		)
	}
}

const mapStateToProps = (state) => ({
	showNotification: state.common.showNotification,
	isLoading: state.project.isLoading,
	projects: state.project.projects,
	editingProject: state.project.editingProject,
	isError: state.project.isError,
	newProject: state.project.newProject,
	infoText: state.project.infoText
});

const mapDispatchToProps = (dispatch) => ({
	fetchProject: () => { dispatch(fetchProject()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);