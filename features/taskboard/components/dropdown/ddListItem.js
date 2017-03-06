import React from 'react';

class DDListItem extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

	  return (
	    <li><a className="dd-list-item" href="javascript:void(0);" ><img src="/static/imgs/100.png"/>{this.props.executor.name}</a></li>
  	);
	}

}


export default DDListItem;