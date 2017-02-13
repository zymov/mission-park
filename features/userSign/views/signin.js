import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import * as actionCreators from '../actions';

class SignIn extends React.Component {

	constructor(props,context){
		super(props, context);

    // const storedMessage = localStorage.getItem('successMessage');
    // let successMessage = '';

    // if (storedMessage) {
    //   successMessage = storedMessage;
    //   localStorage.removeItem('successMessage');
    // }

		this.state = {
      // signinErrors: {},
      // successMessage,
      user: {
        email: '',
        password: ''
      }
		}
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.actions.signinUser(this.state.user.email, this.state.user.password, this.context);
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
			<div className="container" style={{maxWidth: '360px'}}>
				<form action="/" 
				 onSubmit={this.handleSubmit.bind(this)}
				>
					<h2>Sign In</h2>
					{this.props.errors.summary && <p className="text-danger">{this.props.errors.summary}</p>}
					<div className="form-group">
						<input 
							// floatingLabelText="Email" 
							name="email" 
							type="email" 
							className="form-control" 
							// errorText={this.props.errors.email} 
							placeholder="email" 
							onChange={this.handleChange.bind(this)} 
							value={this.state.user.email} 
						/>
						<label className="text-danger">{this.props.errors.email}</label>
		        <input
		          // floatingLabelText="Password"
		          type="password" 
		          className="form-control" 
		          name="password" 
		          placeholder="password" 
		          onChange={this.handleChange.bind(this)}
		          // errorText={this.props.errors.password}
		          value={this.state.user.password}
		        />
		        <label className="text-danger">{this.props.errors.password}</label>
		        <button type="submit" className="btn btn-success btn-block" role="button">sign in</button>
		      </div>

		      <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.auth.signinErrors
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

SignIn.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);