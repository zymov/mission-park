import React from 'react';
import { connect } from 'react-redux';
import DDListItem from './ddListItem';
import { findUserByName } from '../../../common/actions';
import { getIndexOfArray } from '../../../../utils';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);

	}

	handleChange(e){
		this.props.findUserByName(e.target.value);
	}

	render(){

		var dropdownList = [];

		dropdownList = this.props.projectUsers.map(function(item, index){
			var userSelected = false;
			if(this.props.executors.length > 0){
				var objIndex = getIndexOfArray(this.props.executors, item, 'email');
				if(objIndex != -1){
					userSelected = true;
				}
			}
			return (
				<DDListItem key={index} user={item} userSelected={userSelected}/>
			);
		}.bind(this));	//bind 'this' to inner function

	  return (
	  	<div className="dd">
	  		<div className="dd-input">
		  		<input type="text" className="form-control" placeholder="查找" onChange={this.handleChange.bind(this)}/>
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
	projectUsers: state.common.projectUsers
});

const mapDispatchToProps = dispatch => ({
	findUserByName: (userName) => { dispatch(findUserByName(userName)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownInput);