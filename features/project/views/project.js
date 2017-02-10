import React from 'react';
import {Link} from 'react-router';
// import Navbar from '../../homePage/views/navbar';

export default class Project extends React.Component {
	render(){
		return(
				<div className="container card-deck">
				  <div className="card">
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
				  <div className="card">
				    <img className="card-img-top" src="/static/imgs/cover-media.jpg" alt="Card image cap"/>
				    <div className="card-block">
				      <h4 className="card-title">Card title</h4>
				      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
				    </div>
				    <div className="card-footer">
				      <small className="text-muted">Last updated 3 mins ago</small>
				      <Link to="/project/task" >link</Link>
				    </div>
				  </div>
				  <div className="card">
				    <img className="card-img-top" src="/static/imgs/cover-media.jpg" alt="Card image cap"/>
				    <div className="card-block">
				      <h4 className="card-title">Card title</h4>
				      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
				    </div>
				    <div className="card-footer">
				      <small className="text-muted">Last updated 3 mins ago</small>
				      <Link to="/project/task" >link</Link>
				    </div>
				  </div>
			  </div>
		)
	}
}