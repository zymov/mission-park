import React from 'react';

export default class ModalFooter extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="modal-footer">
	      <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
	      <button type="button" className="btn btn-primary" onClick={this.props.handleSubmit}>保存</button>
	    </div>
		)
	}
}