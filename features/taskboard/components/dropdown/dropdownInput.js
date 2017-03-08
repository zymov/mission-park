import React from 'react';
import { connect } from 'react-redux';
import DDListItem from './ddListItem';
import { getIndexOfObjectArray } from '../../../../utils';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);

	}

	render(){

		var dropdownList = [];

		dropdownList = this.props.projectUsers.map(function(item, index){
			var userSelected = false;
			if(this.props.executors.length > 0){
				var objIndex = getIndexOfObjectArray(this.props.executors, item, 'email');
				if(objIndex != -1){
					userSelected = true;
				}
			}
			return (
				<DDListItem key={index} user={item} userSelected={userSelected}/>
			);
		}.bind(this));

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