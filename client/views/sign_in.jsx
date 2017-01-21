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
		this.state = {
      errors: {},
      // successMessage,
      user: {
        email: '',
        password: ''
      }
		}
	}

	handleSubmit(){
		// this.props.actions.signinUser(this.state.email, this.state.password);
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
				<form action="/signin"  method="post" 
				 // onSubmit={this.handleSubmit.bind(this)}
				>
					<h2 className="card-heading">Login</h2>
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