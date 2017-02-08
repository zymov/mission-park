import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {

	render(){
		return(
			<nav className="navbar navbar-toggleable-md navbar-light" style={{backgroundColor: '#e3f2fd', marginBottom: '10px'}}>
		    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <a className="navbar-brand" href="#">Navbar</a>

		    <div className="collapse navbar-collapse" id="navbarColor03">
		      <ul className="navbar-nav mr-auto">
		        <li className="nav-item active">
		          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="#">任务板</a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="#">Pricing</a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="#">About</a>
		        </li>
		      </ul>
		      <form className="form-inline">
		        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
		        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
		      </form>
		      <ul className="navbar-nav">
		      	<li className="nav-item">
		      		<Link className="nav-link" to="/signout" >sign out</Link>
		      	</li>
		      </ul>
		    </div>
		  </nav>
		)
	}

}

export default Navbar;