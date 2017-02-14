import React from 'react';

export default class TaskContainer extends React.Component {
	render(){
		return(
			<div className="col-md-8" style={{padding: 0}}>
				{this.props.children}
			</div>
		)
	}
}