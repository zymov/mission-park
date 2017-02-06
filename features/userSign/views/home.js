import React from 'react';
import { Link } from 'react-router';
import {checkUserSignin} from '../../../utils';
import Board from '../../taskBoard/views/board';

export default class Home extends React.Component {

	render(){
		return(
			<div className="container">
				
				{
					checkUserSignin() ? 
					(
						<div>
							<ul>
								<li><Link to="/signout" >sign out</Link></li>
							</ul>
							<Board />
						</div>
					) : 
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