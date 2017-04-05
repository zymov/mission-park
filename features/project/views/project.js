import React from 'react';
import ProjectNav from '../components/projectNav';

export default class Project extends React.Component {

	render(){

		const projectId = this.props.params.projectId;

		return (
			<div className="project-container">
				<ProjectNav projectId={projectId}/>
        {this.props.children}
      </div>
		)
	}
}
