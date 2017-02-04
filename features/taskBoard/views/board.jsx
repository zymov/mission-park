import React from 'react';
import Card from './card.jsx';

export default class Board extends React.Component {
	render(){
		return(
			<div className="panel panel-default">
				<div className="panel-heading">task board head</div>
				<div className="panel-body">
					<Card />
				</div>
			</div>
		)
	}
}