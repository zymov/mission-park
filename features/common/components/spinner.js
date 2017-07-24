import React from 'react';

class Spinner extends React.Component {

	render(){
		return (
			<div className="spinner" style={{display: this.props.show ? 'block' : 'none'}}>
			  <div className="bounce1"></div>
			  <div className="bounce2"></div>
			  <div className="bounce3"></div>
			</div>
		);
	}

}

export default Spinner;

