import React, { PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectCard extends React.Component {

	constructor(props, context){
		super(props, context);

	}

	handleClick(){
		this.context.router.push('/project/task');
	}

	render(){
		return(
			<div className="card" onClick={this.handleClick.bind(this)} >
		    <img className="card-img-top" src="/static/imgs/cover-media.jpg" alt="Card image cap"/>
		    <div className="card-block">
		      <h4 className="card-title">Card title</h4>
		      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
		    </div>
		    <div className="card-footer">
		      <small className="text-muted">Last updated 3 mins ago</small>
		      <Link to="/project/task" >link</Link>
		    </div>
	  	</div>
		)
	}
}

ProjectCard.contextTypes = {
	router: PropTypes.object.isRequired
}
