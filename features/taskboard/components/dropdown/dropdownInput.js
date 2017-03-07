import React from 'react';
import { connect } from 'react-redux';
import DDListItem from './ddListItem';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);

	}

	render(){

		var dropdownList = [];

		dropdownList = this.props.projectUsers.map(function(item, index){
			return (
				<DDListItem key={index} user={item} />
			);
		});

	  return (
	  	<div className="dd">
	  		<div className="dd-input">
		  		<input type="text" className="form-control" placeholder="查找"/>
	  		</div>
  		  <ul className="dd-menu" >
  		  	{dropdownList}
  		  </ul>
  	  </div>
  	);
	}

}

const mapStateToProps = state => ({
	executors: state.taskboard.task.executors,
	projectUsers: state.taskboard.task.projectUsers
});

// const mapDispatchToProps = dispatch => ({
// 	addExecutor: user => { dispatch(addExecutor(user)); }
// });

export default connect(mapStateToProps, null)(DropdownInput);