import React from 'react';
import Card from './card';
import Mod from './mod';

export default class Board extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Mod />
			</div>
		)
	}
}