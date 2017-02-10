import React from 'react';
import Navbar from './homePage/views/navbar';
import SignIn from './userSign/views/signin';
import {checkUserSignin} from '../utils';

export default class App extends React.Component {
	render(){
		if(!checkUserSignin()){
			return (<SignIn />);
		} else {
			return (
				<div>
					<Navbar />
	        {this.props.children}
	      </div>
			)
		}
	}
}
