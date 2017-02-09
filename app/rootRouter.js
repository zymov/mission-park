import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'

import { deAuthenticateUser } from '../utils';
import rootStore from './rootStore';

import routes from '../features/homePage/routes';

render(
	(
		<Provider store={rootStore} >
			<Router history={browserHistory} >
				{routes}
			</Router>
		</Provider>
	), document.getElementById('app'));

// <Route path="/" component={App} ></Route>