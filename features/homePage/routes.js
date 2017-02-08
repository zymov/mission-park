import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignIn from '../userSign/views/signin';
import SignUp from '../userSign/views/signup';
import Home   from './views/home';
import Project from '../project/views/project';
import Board from '../taskBoard/views/board';
import userAuthRoutes from '../userSign/routes';

import {deAuthenticateUser} from '../../utils';

//<Route path="task" component={Board} />
const routes = (
	<Route >
	  <IndexRoute component={Home} />
	  <Route path="/project" component={Project} />
  	<Route path="/project/task" component={Board} />
	  {userAuthRoutes}
	</Route>
);

//<Route path="signout" onEnter={ (nextState, replace)=>{deAuthenticateUser(); replace('/')} } />
		// <Route path="signin" component={SignIn} />
		// <Route path="signup" component={SignUp} />

export default routes;