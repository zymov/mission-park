import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Home   from './views/home';
import {deAuthenticateUser} from '../../utils';

const routes = (
	<Route >
		<IndexRoute component={Home} />
		<Route path="signout" onEnter={ (nextState, replace)=>{deAuthenticateUser(); replace('/')} } />
		<Route path="signin" component={SignIn} />
		<Route path="signup" component={SignUp} />
	</Route>
);

export default routes;