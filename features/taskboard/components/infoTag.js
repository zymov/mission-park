import React from 'react';

class InfoTag extends React.Component {

	render(){
		const name = this.props.tag;
		return(
			<li><a title={name}>{name}</a></li>
		)
	}
	
}


export default InfoTag;