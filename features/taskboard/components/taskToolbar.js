import React from 'react';
import { connect } from 'react-redux';
import AddTask from './addTask';

class TaskToolbar extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="btn-group" role="group" aria-label="Basic example">
		  	<AddTask projectId={this.props.projectId} tasklistId={this.props.tasklistId} />
			  <button type="button" className="btn btn-secondary">btn2</button>
			  <button type="button" className="btn btn-secondary">btn3</button>
			</div>
		);
	}

}


// const mapDispatchToProps = dispatch => ({
// 	fetchTasklist: projectId => { dispatch(fetchTasklist(projectId)); }
// })


// export default connect(null, mapDispatchToProps)(TasklistToolbar);
export default TaskToolbar;