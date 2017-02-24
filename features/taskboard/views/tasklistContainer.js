import React from 'react';

export default class TasklistContainer extends React.Component {
	render(){
		return(
			<div  style={{paddingLeft: 0}}>
				<div className="list-group">
					{this.props.children}
				</div>
			</div>
		)
	}
}