import React from 'react';
import Card from './card';
// import Mod from './mod';
import Navbar from '../../homePage/views/navbar';

export default class Board extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Navbar />
				<div className="container">
					<div className="btn-group" role="group" aria-label="Basic example">
					  <button type="button" className="btn btn-secondary">新增任务列表</button>
					  <button type="button" className="btn btn-secondary">Middle</button>
					  <button type="button" className="btn btn-secondary">Right</button>
					</div>
					<Card />
				</div>
			</div>
		)
	}
}