import React from 'react';
import { connect } from 'react-redux';
import { removeExecutor } from '../actions/taskActions';

class RemovableLabel extends React.Component {

	handleClick(){
		this.props.removeExecutor(this.props.executor);
	}

	render(){

		const name = this.props.executor.name;

		return(
			<li className="removable">
				<a title={name}><img src="/static/imgs/100.png" />{name}</a>
				<span className="remove-executor glyphicon glyphicon-remove" onClick={this.handleClick.bind(this)}></span>
			</li>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	removeExecutor: user => { dispatch(removeExecutor(user)); }
});

export default connect(null, mapDispatchToProps)(RemovableLabel);