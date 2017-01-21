import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actionCreators from '../actions/userActions';

class SignIn extends React.Component {

	constructor(props){
		super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

		this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
		}
	}

	handleSubmit(event){
		// this.props.actions.signinUser(this.state.email, this.state.password);
		event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        localStorage.setItem('token', xhr.response.token);

        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
	}

	handleChange(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
    	user
    });
	}

	render(){
		return (
			<Card className="container">
				<form action="/" 
				 onSubmit={this.handleSubmit.bind(this)}
				>
					<h2 className="card-heading">Sign In</h2>
					{this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
					<div className="field-line">
						<TextField 
							floatingLabelText="Email" 
							name="email" 
							errorText={this.state.errors.email} 
							onChange={this.handleChange.bind(this)} 
							value={this.state.email} 
						/>
					</div>
		      <div className="field-line">
		        <TextField
		          floatingLabelText="Password"
		          type="password"
		          name="password"
		          onChange={this.handleChange.bind(this)}
		          errorText={this.state.errors.password}
		          value={this.state.password}
		        />
		      </div>

		      <div className="button-line">
		        <RaisedButton type="submit" label="Log in" primary />
		      </div>

		      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
				</form>
			</Card>
		);
	}
}

// const mapStateToProps = (state) => ({
// 	isAuthenticating: state.auth.isAuthenticating,
// 	statusText: state.auth.statusText
// });

// const mapDispatchToProps = (dispatch) => ({
// 	actions: bindActionCreators(actionCreators, dispatch)
// });

export default SignIn;
// connect(mapStateToProps, mapDispatchToProps)(SignInForm);