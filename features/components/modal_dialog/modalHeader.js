import React from 'react';

export default class ModalHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		var headerText = '创建新';
		if(this.props.createProject){
			headerText += '项目'
		} else if(this.props.createTasklistTo){
			headerText += '任务列表至  ' + this.props.createTasklistTo;
		} else {
			headerText += '任务至  ' + this.props.createTaskTo;
		}

		return(
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">{headerText}</h4>
      </div>
		)
	}
}