import React from 'react';

export default class ModalHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		var headerText = '创建新';
		if(this.props.createProject){
			headerText += '项目'
		} else if(this.props.createTaskListTo){
			headerText += '任务列表至' + this.props.createTaskListTo;
		} else {
			headerText += '任务至' + this.props.createTaskTo;
		}

		return(
			<div className="modal-header">
      	<h5 className="modal-title">{headerText}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
		)
	}
}