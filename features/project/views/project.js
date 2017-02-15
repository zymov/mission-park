import React from 'react';
import ProjectNav from './projectNav';

export default class Project extends React.Component {

	render(){

		const projectId = this.props.params.projectId;

		return (
			<div>
				<ProjectNav projectId={projectId}/>
        {this.props.children}
      </div>
		)
	}
}
