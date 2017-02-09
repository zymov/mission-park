import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignIn from '../userSign/views/signin';
import SignUp from '../userSign/views/signup';
import Home   from './views/home';
import Project from '../project/views/project';
import Board from '../taskBoard/views/board';
import userAuthRoutes from '../userSign/routes';
import Navbar from '../homePage/views/navbar';
import App from '../app';

import {deAuthenticateUser} from '../../utils';

const routes = (
	<Route path="/" component={App} >
	  <IndexRoute component={Home} />
	  <Route path="/project" component={Project} />
  	<Route path="/project/task" component={Board} />
	  {userAuthRoutes}
	</Route>
);


export default routes;