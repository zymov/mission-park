import React from 'react';

class DDListItem extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		const { item, selected, itemClick } = this.props;

	  return (
	    <li>
	    	<a className="dd-list-item" href="javascript:void(0);" onClick={itemClick.bind(this, item)}>
	    		<img src="/static/imgs/100.png"/>
	    		{ item.name }
	    		{ selected && <i className="glyphicon glyphicon-ok"></i>}
	    	</a>
	    </li>
  	);
	}

}

export default DDListItem;