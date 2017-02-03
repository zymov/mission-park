import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import SignIn from './views/signin.jsx';
import SignUp from './views/signup.jsx';
import Home   from './views/home.jsx';
import {deAuthenticateUser} from '../../utils';

// export default routes = {(
// 	<Route >
// 		<IndexRoute component={Home} />
// 		<Route path="signout" onEnter={ (nextState, replace)=>{deAuthenticateUser(); replace('/')} } />
// 		<Route path="signin" component={SignIn} />
// 		<Route path="signup" component={SignUp} />
// 	</Route>
// )}