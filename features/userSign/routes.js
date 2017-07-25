import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignIn from './views/signin';
import SignUp from './views/signup';

const routes = (
	<Route >
		<Route path="/auth/signout" />
		<Route path="signin" component={SignIn} />
		<Route path="signup" component={SignUp} />
	</Route>
);

export default routes;