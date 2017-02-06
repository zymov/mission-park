import React from 'react';

export default class ModalWrapper extends React.Component {

	constructor(props){
		super(props);

	}

	render(){
		return(
			<div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="modelLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			    	{this.props.children}
			    </div>
			  </div>
			</div>
		)
	}
}