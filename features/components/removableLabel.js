import React from 'react';

class RemovableLabel extends React.Component {

	render(){

		const { imgsrc, linkText } = this.props.label;

		return(
			<li className="removable">
				<a title={linkText}><img src={imgsrc} />{linkText}</a>
				<span className="remove-executor glyphicon glyphicon-remove"></span>
			</li>
		);

	}

}

export default RemovableLabel;