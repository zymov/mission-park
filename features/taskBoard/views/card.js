import React from 'react';

export default class Card extends React.Component {
	render(){
		return(
			<div>
				<input type="checkbox" />
				<div className="task-container">
					<div className="task-content">task content</div>
					<div className="task-info">
						<span className="label label-default">timestamp: 2017-2-5</span>
						<span className="label label-danger">danger</span>
					</div>
				</div>
				
			</div>
		)
	}
}