import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home   from './views/home';
import Project from '../project/views/project';
import Board from '../taskBoard/views/board';
import Navbar from '../homePage/views/navbar';
import App from '../app';


const routes = (
	<Route path="/" component={App} >
	  <IndexRoute component={Home} />
	  <Route path="/project" component={Project} />
  	<Route path="/project/:projectId/taskboard" component={Board} />
	</Route>
);


export default routes;