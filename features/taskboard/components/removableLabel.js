import React from 'react';

class RemovableLabel extends React.Component {

	render(){

		const name = this.props.executor.name;

		return(
			<li className="removable">
				<a title={name}><img src="/static/imgs/100.png" />{name}</a>
				<span className="remove-executor glyphicon glyphicon-remove"></span>
			</li>
		);

	}

}

export default RemovableLabel;