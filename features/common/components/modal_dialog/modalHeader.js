import React from 'react';

export default class ModalHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

		var headerText = '创建新';
		if(this.props.createProject){
			headerText += '项目'
		} else if(this.props.createTasklist){
			headerText += '任务列表';
		} else if(this.props.newTaskFlag){
			headerText += '任务至  ' + this.props.createTaskTo;
		} else if(this.props.editProject){
			headerText = '编辑项目';
		} else if(this.props.deleteProject){
			headerText = '删除项目'
		} else {
			headerText = '编辑任务';
		}

		return(
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">{headerText}</h4>
      </div>
		)
	}
}