import React from 'react';
import { connect } from 'react-redux';
import { getEditingProject } from '../actions';

class EditProject extends React.Component {

	constructor(props){
		super(props);

	}

	handleEdit(){
		this.props.getEditingProject(this.props.project);
	}

	render(){

		return (
			<div className="project-options">
				<button type="button" 
					data-toggle="modal" 
					data-target="#editProject" 
					className="glyphicon glyphicon-pencil" 
					onClick={this.handleEdit.bind(this)} 
					>
				</button>
				<button type="button" 
					data-toggle="modal" 
					data-target="#deleteProject" 
					className="glyphicon glyphicon-trash" 
					onClick={this.handleEdit.bind(this)}>
				</button>
			</div>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	getEditingProject: project => dispatch(getEditingProject(project))
});

export default connect(null, mapDispatchToProps)(EditProject);