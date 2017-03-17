import React from 'react';

class Dropdown extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

	  const { menuList, btnId, handleClick } = this.props.dropdown; 

	  var dropdownMenu = menuList.map(function(item, index){
	  	return (
		    <li key={index}><a href="javascript:void(0);" name={item.name} style={item.style}>{item.name}</a></li>
	  	);
	  });

	  return (
	  	<div className="dropdown">
  	  	<button className="dropdown-toggle" type="button" id={btnId} 
  	  	data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={this.props.btnStyle}>
  		    {this.props.btnName}
  		  </button>
  		  <ul className="dropdown-menu" onClick={handleClick.bind(this)} aria-labelledby={btnId}>
  		    {dropdownMenu}
  		  </ul>
  	  </div>
  	);
	}

}


export default Dropdown;