import React from 'react';

export default class Dialog extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			taskContent: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(){
		var taskContent = this.state.taskContent;
		
	}

	render(){
		return(
			<div className="modal fade" id="newTaskDialog" tabIndex="-1" role="dialog" aria-labelledby="modelLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			      	<h5 className="modal-title">创建新任务至{"x"}</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <textarea className="form-control" name="taskContent" 
			        placeholder="任务内容" rows="3" 
			        onChange={this.handleInputChange} 
			        value={this.state.taskContent}></textarea>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}