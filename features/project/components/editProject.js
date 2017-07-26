import React from 'react';
// import Dropdown from '../../common/components/dropdown/dropdown';

class EditProject extends React.Component {

	constructor(props){
		super(props);

	}



	render(){

		return (
			<div className="project-options">
				<span className="glyphicon glyphicon-pencil"></span>
				<span className="glyphicon glyphicon-trash"></span>
			</div>
		);

	}

}

export default EditProject;