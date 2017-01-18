import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actionCreators from '../actions/userActions';

class SignInForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit(){
		this.props.actions.loginUser(this.state.email, this.state.password);
	}

	handleChange(){
		console.log('a');
	}

	render(){
		return (
			<Card className="container">
				<form action="/" onSubmit={this.handleSubmit.bind(this)}>
					<h2 className="card-heading">Login</h2>
					{this.props.statusText && <p className="error-message">{this.props.statusText}</p>}
					<div className="field-line">
						<TextField 
							floatingLabelText="Email" 
							name="email" 
							errorText={this.props.statusText} 
							// onChange={this.handleChange.bind(this)} 
							value={this.props.email} 
						/>
					</div>
		      <div className="field-line">
		        <TextField
		          floatingLabelText="Password"
		          type="password"
		          name="password"
		          // onChange={this.handleChange.bind(this)}
		          errorText={this.props.statusText}
		          value={this.props.password}
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

const mapStateToProps = (state) => ({
	isAuthenticating: state.auth.isAuthenticating,
	statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);