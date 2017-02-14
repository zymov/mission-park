import React from 'react';

export default class TaskListContainer extends React.Component {
	render(){
		return(
			<div className="col-md-4" style={{paddingLeft: 0}}>
				<div className="list-group">
					{this.props.children}
				</div>
			</div>
		)
	}
}