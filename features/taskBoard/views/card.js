import React from 'react';
import Mod from './mod';

export default class Card extends React.Component {
	render(){
		return(
			<div className="card">
			  <div className="card-header">Featured</div>
			  <div className="card-block">
			    <h4 className="card-title">Special title treatment</h4>
			    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
			    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
			    <Mod />
			  </div>
			</div>
		)
	}
}