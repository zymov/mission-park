import React from 'react';
import TriggerBtn from '../../../components/modal_dialog/triggerBtn';

class AddProject extends React.Component {

	render(){
		return (
			<div className="card">
		    <div className="card-block">
		      <button type="button" className="btn add-project" 
						data-toggle="modal" 
						data-target="#addProject"
					>Add New Project</button>
				</div>
		  </div>
		 )
	}

}

export default AddProject;