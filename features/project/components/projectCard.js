import React, { PropTypes } from 'react';
import { formatDate } from '../../../utils';

class ProjectCard extends React.Component {

	constructor(props, context){
		super(props, context);
	}

	handleClick(){
		this.context.router.push(`/project/${this.props.project._id}/taskboard`);
	}

	render(){

		const { projectName, description, createTime, owner } = this.props.project;

		return(

			  <div className="col-sm-6 col-md-4">
			    <div className="thumbnail"  onClick={this.handleClick.bind(this)} >
			      <img src="/static/imgs/cover-media.jpg" alt="project img" />
			      <div className="caption">
			        <h3>{projectName}</h3>
			        <p title={description}>{description}</p>
			      </div>
			      <div className="panel-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
				    	<p title={owner} className="text-muted project-info">{`创建者:${owner}`}</p>
				      <p className="text-muted">{`创建时间：${formatDate(createTime)}`}</p>
				    </div>
			    </div>
			  </div>
		);
	}
}

ProjectCard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ProjectCard;