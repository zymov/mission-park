import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import * as actionCreators from '../actions';

class SignUp extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			// signupErrors: {},
			user: {
				name: '',
				email: '',
				password: ''
			}
		}
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.actions.signupUser(this.state.user.name, this.state.user.email, this.state.user.password, this.context);
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
		return(
			<div className="container" style={{maxWidth: '360px'}}>
		    <form action="/"  
		    onSubmit={this.handleSubmit.bind(this)}
		    >
		      <h2>Sign Up</h2>
	      	{this.props.errors.summary && <p className="text-danger">{this.props.errors.summary}</p>}
		      <div className="form-group">
		        <input
		          // floatingLabelText="Name" 
		          name="name" 
		          type="text" 
		          // errorText={this.props.errors.name} 
		          className="form-control" 
		          placeholder="your name"
		          onChange={this.handleChange.bind(this)} 
		          value={this.state.user.name} 
		        />
		        <label className="text-danger">{this.props.errors.name}</label>
		        <input
		          // floatingLabelText="Email"
		          name="email"
		          type="email" 
		          // errorText={this.props.errors.email}
		          className="form-control" 
		          placeholder="email" 
		          onChange={this.handleChange.bind(this)} 
		          value={this.state.user.email}
		        />
		        <label className="text-danger">{this.props.errors.email}</label>
		        <input
		          // floatingLabelText="Password" 
		          name="password"
		          type="password"
		          className="form-control" 
		          placeholder="password" 
		          onChange={this.handleChange.bind(this)} 
		          // errorText={this.props.errors.password}
		          value={this.state.user.password}
		        />
		        <label className="text-danger">{this.props.errors.password}</label>
		        <button type="submit" className="btn btn-success btn-block" role="button">Create New Account</button>
		      </div>
		      <p>Already have an account? <Link to={'/signin'}>Log in</Link></p>
		    </form>
		  </div>
		);
	}
}

const mapStateToProps = (state) => ({
	// name: state.name,
	// email: state.email,
	// password: state.password
	errors: state.signupErrors
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

SignUp.contextTypes = {
	router: PropTypes.object.isRequired
}

// export default SignUp;
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);