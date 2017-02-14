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
			<div className="card" onClick={this.handleClick.bind(this)} >
		    <img className="card-img-top" src="/static/imgs/cover-media.jpg" alt="Card image cap"/>
		    <div className="card-block">
		      <h4 className="card-title">{projectName}</h4>
		      <p className="card-text">{description}</p>
		    </div>
		    <div className="card-footer">
		    	{`owned by:${owner}`}
		      <small className="text-muted">{createTime}</small>
		    </div>
	  	</div>
		)
	}
}

ProjectCard.contextTypes = {
	router: PropTypes.object.isRequired
}
