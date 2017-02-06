import React from 'react';

export default class ModalHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="modal-header">
      	<h5 className="modal-title">创建新任务至{this.props.createTaskTo}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
		)
	}
}