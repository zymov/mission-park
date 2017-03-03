import React from 'react';
import { connect } from 'react-redux';
import Tasklist from './tasklist';
import { fetchTasklist } from '../actions/tasklistActions';

class TasklistContainer extends React.Component {

	componentWillMount(){
		this.props.fetchTasklist(this.props.projectId);
	}

	render(){

		// var fetchedTaskList = [];

		// fetchedTaskList = this.props.tasklists.map(function(tasklist, index){
		// 	return <Tasklist key={index} index={index} tasklist={tasklist} />;
		// });

		return(
			<div className="list-group">
				{this.props.children}
			</div>
		)
	}
}

// const mapStateToProps = state => ({
// 	tasklists: state.taskboard.tasklist.tasklists
// });

const mapDispatchToProps = dispatch => ({
	fetchTasklist: projectId => { dispatch(fetchTasklist(projectId)); }
});



export default connect(null, mapDispatchToProps)(TasklistContainer);