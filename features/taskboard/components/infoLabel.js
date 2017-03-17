import React from 'react';

class InfoLabel extends React.Component {

	render(){

		const { item, removable, labelClick } = this.props;

		return(
			<li className="removable">
				<a title={item.name}><img src="/static/imgs/100.png" />{item.name}</a>
				{removable && <span className="remove-executor glyphicon glyphicon-remove" onClick={labelClick.bind(this, item)}></span>}
			</li>
		);

	}

}

export default InfoLabel;