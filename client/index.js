import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import SignIn from './views/sign_in.jsx';
import SignUp from './views/sign_up.jsx';
import Home from './views/home.jsx';

class App extends React.Component {
	render(){
		return(
			<div>
        {this.props.children}
			</div>
		);
	}
}

render(
	(
		<Router history={browserHistory} >
			<Route path="/" component={App} >
				<IndexRoute component={Home} />
				<Route path="signin" component={SignIn} />
				<Route path="signup" component={SignUp} />
			</Route>
		</Router>
	), document.getElementById('app'));