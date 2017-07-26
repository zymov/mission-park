import React from 'react';
import DDListItem from './ddListItem';
import { getIndexOfArray } from '../../../../utils';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);

	}

	render(){
		const { menuList, selectedList, inputHandler, itemClick, btnHandler } = this.props.dropdownInputData;

		let dropdownList = [];

		dropdownList = menuList.map(function(item, index){
			let selected = false;
			if(selectedList.length > 0){
				let objIndex = -1;
				if(item._id){
					objIndex = getIndexOfArray(selectedList, item, '_id');
				} else {
					objIndex = selectedList.indexOf(item);
				}
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
		  		{ btnHandler && <button type="button" className="add-label" onClick={btnHandler}>添加</button>}
	  		</div>
  		  <ul className="dd-menu" >
  		  	{dropdownList}
  		  </ul>
  	  </div>
  	);
	}

}

export default DropdownInput;