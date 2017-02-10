import React from 'react';
import { Link } from 'react-router';
import {checkUserSignin} from '../../../utils';
import Board from '../../taskBoard/views/board';
// import Navbar from './navbar';
// import SignIn from '../../userSign/views/signin';
import Project from '../../project/views/project';

class Home extends React.Component {

	render(){

		// if(!checkUserSignin()){
		// 	return (
		// 			<SignIn />
		// 	)
		// } else {
			return (
					<Project />
			)
		// }

	}

}

export default Home;


