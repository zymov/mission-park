import React from 'react';
import DDListItem from './ddListItem';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		var dropdownList = [];

		dropdownList = this.props.executors.map(function(item, index){
			return (
				<DDListItem key={index} executor={item} />
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


export default DropdownInput;