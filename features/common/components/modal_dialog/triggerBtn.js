import React from 'react';

export default class TriggerBtn extends React.Component {
	render(){
		return(
			<button type="button" className="btn btn-primary" 
				data-toggle="modal" 
				data-target={this.props.dataTarget} 
				style={ this.props.display ? {display: this.props.display} : {}}
			>{this.props.btnName}</button>
		)
	}
}