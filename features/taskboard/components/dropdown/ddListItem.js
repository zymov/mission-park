import React from 'react';
import { connect } from 'react-redux';
import { addExecutor, removeExecutor } from '../../actions/taskActions';
import { getIndexOfObjectArray } from '../../../../utils';

class DDListItem extends React.Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){

		if(getIndexOfObjectArray(this.props.executors, this.props.user, 'email') == -1){
			this.props.addExecutor(this.props.user);
		} else {
			this.props.removeExecutor(this.props.user);		//remove user by it's position(index)? Which method performs better?
		}
		
	}

	render(){

	  return (
	    <li>
	    	<a className="dd-list-item" href="javascript:void(0);" onClick={this.handleClick}>
	    		<img src="/static/imgs/100.png"/>
	    		{this.props.user.name}
	    		{ this.props.userSelected && <i className="glyphicon glyphicon-ok"></i>}
	    	</a>
	    </li>
  	);
	}

}

const mapStateToProps = state => ({
	executors: state.taskboard.task.executors
});

const mapDispatchToProps = dispatch => ({
	addExecutor: user => { dispatch(addExecutor(user)); },
	removeExecutor: user => { dispatch(removeExecutor(user)); }
});


export default connect(mapStateToProps, mapDispatchToProps)(DDListItem);