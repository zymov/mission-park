import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import SignIn from './views/sign_in.jsx';
import SignUp from './views/sign_up.jsx';
import Home from './views/home.jsx';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deAuthenticateUser} from '../utils';

class App extends React.Component {
	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
        {this.props.children}
			</MuiThemeProvider>
		);
	}
}

render(
	(
		// <Provider store={store} >
			<Router history={browserHistory} >
				<Route path="/" component={App} >
					<IndexRoute component={Home} />
					<Route path="signout" onEnter={ (nextState, replace)=>{deAuthenticateUser(); replace('/')} } />
					<Route path="signin" component={SignIn} />
					<Route path="signup" component={SignUp} />
				</Route>
			</Router>
		// </Provider>
	), document.getElementById('app'));