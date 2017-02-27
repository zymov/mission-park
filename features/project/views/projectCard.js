import React, { PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectCard extends React.Component {

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
			      <div className="panel-footer">
				    	{`owned by:${owner}`}
				      <small className="text-muted">{createTime}</small>
				    </div>
			    </div>
			  </div>


		)
	}
}

ProjectCard.contextTypes = {
	router: PropTypes.object.isRequired
}

