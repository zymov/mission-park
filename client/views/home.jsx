import React from 'react';
import { Link } from 'react-router';
import {checkUserSignin} from '../../utils';

export default class Home extends React.Component {

	render(){
		return(
			<div>
				
				{
					checkUserSignin() ? 
					(<ul><li><Link to="/signout" >sign out</Link></li></ul>) : 
					(
						<ul>
							<li><Link to="/signin" >sign in</Link></li>
							<li><Link to="/signup" >sign up</Link></li>
						</ul>
					)
				}
				
			</div>
		);
	}
}