import React from 'react';

class DDListItem extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		const { item, selected, itemClick } = this.props;

	  return (
	    <li>
	    	<a className="dd-list-item" href="javascript:void(0);" title={item.name || item} onClick={itemClick.bind(this, item)}>
	    		{ item.name && <img src={`https://api.adorable.io/avatars/32/${item._id}@adorable.io.png`} title={item.name} />}
	    		{ item.name || item }
	    		{ selected && <i className="glyphicon glyphicon-ok"></i>}
	    	</a>
	    </li>
  	);
	}

}

export default DDListItem;