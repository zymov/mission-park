import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
	render(){
		return(
			<div>
				<ul>
					<li><Link to="/signin" >sign in</Link></li>
					<li><Link to="/signup" >sign up</Link></li>
				</ul>
			</div>
		);
	}
}