import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import * as actionCreators from '../actions';

class ProjectToolbar extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			projectName: '',
			description: ''
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

	handleSubmit(event){

		var payload = {
			projectName: this.state.projectName,
			description: this.state.description,
			token: localStorage.getItem('token')
		}

		this.props.actions.addProject(payload);
		this.setState({
			projectName: '',
			description: ''
		});
		$('#addProject').click();
		// this.props.actions.fetchProject();
	}

	render(){
		return(
			<div className="row" style={{marginTop: '20px'}}>

			<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#addProject">添加新项目</button>
				<ModalWrapper id="addProject" >
					<ModalHeader createProject={true} />
					<div className="modal-body">
						<div className="form-group" >
			        <input className="form-control" name="projectName" 
				        placeholder="项目名称" 
				        onChange={this.handleInputChange} 
				        value={this.state.projectName} />
				    </div>
				    <div className="form-group" >
				      <textarea className="form-control" name="description"  
				        placeholder="项目简介（选填）" rows="2" 
				        onChange={this.handleInputChange} 
				        value={this.state.description}></textarea>
			      </div>
		      </div>
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(ProjectToolbar);