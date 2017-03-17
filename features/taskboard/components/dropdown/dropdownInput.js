import React from 'react';
import DDListItem from './ddListItem';
import { getIndexOfArray } from '../../../../utils';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);

	}

	render(){
		const { menuList, selectedList, inputHandler, itemClick, btnHandler } = this.props.dropdownInputData;

		var dropdownList = [];

		dropdownList = menuList.map(function(item, index){
			var selected = false;
			if(selectedList.length > 0){
				var objIndex = getIndexOfArray(selectedList, item, '_id');
				if(objIndex != -1){
					selected = true;
				}
			}
			return (
				<DDListItem key={index} item={item} selected={selected} itemClick={itemClick}/>
			);
		}.bind(this));	//bind 'this' to inner function

	  return (
	  	<div className="dd">
	  		<div className="dd-input">
		  		<input type="text" className="form-control" placeholder="查找" onChange={inputHandler}/>
	  		</div>
  		  <ul className="dd-menu" >
  		  	{dropdownList}
  		  </ul>
  	  </div>
  	);
	}

}

export default DropdownInput;