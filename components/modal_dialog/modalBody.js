import React from 'react';

export default class ModalBody extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="modal-body">
        <textarea className="form-control" name="taskName" 
        placeholder="任务内容" rows="3" 
        onChange={this.props.handleInputChange} 
        value={this.props.taskName}></textarea>
      </div>
		)
	}

}