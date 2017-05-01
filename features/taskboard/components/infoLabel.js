import React from 'react';

class InfoLabel extends React.Component {

	render(){

		const { item, removable, labelClick } = this.props;

		return(
			<li className="removable">
				<a title={item.name || item}>
					{item.name && 
						<img 
							src={`https://api.adorable.io/avatars/24/${item._id}@adorable.io.png`} 
							title={item.name} />}
					{item.name || item}
				</a>
				{removable && <span className="remove-label glyphicon glyphicon-remove" onClick={labelClick.bind(this, item)}></span>}
			</li>
		);

	}

}

export default InfoLabel;