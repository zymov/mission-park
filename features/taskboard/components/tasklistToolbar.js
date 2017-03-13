import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import AddTasklist from './addTasklist';

class TasklistToolbar extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="btn-group" role="group" aria-label="Basic example">
			  <AddTasklist projectId={this.props.projectId} />
			  <button type="button" className="btn btn-secondary">btn2</button>
			  <button type="button" className="btn btn-secondary">btn3</button>
			</div>
		);
	}

}


// const mapDispatchToProps = dispatch => ({
	
// });


// export default connect(null, mapDispatchToProps)(TasklistToolbar);

export default TasklistToolbar;