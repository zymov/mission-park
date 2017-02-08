import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
// import SignIn from '../features/userSign/views/signin.jsx';
// import SignUp from '../features/userSign/views/signup.jsx';
// import Home   from '../features/userSign/views/home.jsx';
// import store  from '../features/userSign/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deAuthenticateUser } from '../utils';

import rootStore from './rootStore';

import routes from '../features/homePage/routes';

class App extends React.Component {
	render(){
		return(
			// <MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
        {this.props.children}
      </div>
			// </MuiThemeProvider>
		);
	}
}

render(
	(
		<Provider store={rootStore} >
			<Router history={browserHistory} >
				<Route path="/" component={App} >
					{routes}
				</Route>
			</Router>
		</Provider>
	), document.getElementById('app'));