import React from 'react';

export default class TasklistContainer extends React.Component {
	render(){
		return(
			<div className="list-group">
				{this.props.children}
			</div>
		)
	}
}