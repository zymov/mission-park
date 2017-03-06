import React from 'react';
import { Link } from 'react-router';

export default class ProjectNav extends React.Component {

	// constructor(props){
	// 	super(props);
	// }

	render(){

		return(
			<div className="project-nav">
				<ul className="nav" >
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to={`/project/${this.props.projectId}/taskboard`}>任务</Link>
				  </li>
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to="/someroute">动态</Link>
				  </li>
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to="/someroute">分享</Link>
				  </li>
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to="/someroute">文件</Link>
				  </li>
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to="/someroute">日程</Link>
				  </li>
				  <li className="nav-item">
				    <Link className="nav-link" activeClassName="active-projectnav" to="/someroute">群聊</Link>
				  </li>
				</ul>
			</div>
		)
	}
}