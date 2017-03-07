import React from 'react';
import { connect } from 'react-redux';
import { addExecutor } from '../../actions/taskActions';
import { getIndexOfObjectArray } from '../../../../utils';

class DDListItem extends React.Component {

	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(e){
		
		//this.props.executors.indexOf(this.props.user) == -1 
		getIndexOfObjectArray(this.props.executors, this.props.user, 'name') == -1 && this.props.addExecutor(this.props.user);
		
	}

	render(){

	  return (
	    <li>
	    	<a className="dd-list-item" href="javascript:void(0);" onClick={this.handleClick}>
	    		<img src="/static/imgs/100.png"/>
	    		{this.props.user.name}
	    	</a>
	    </li>
  	);
	}

}

const mapStateToProps = state => ({
	executors: state.taskboard.task.executors
});

const mapDispatchToProps = dispatch => ({
	addExecutor: user => { dispatch(addExecutor(user)); }
});


export default connect(mapStateToProps, mapDispatchToProps)(DDListItem);