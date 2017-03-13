import React from 'react';
import { connect } from 'react-redux';
import Tasklist from './tasklist';
import { fetchTasklists } from '../actions/tasklistActions';

class TasklistContainer extends React.Component {

	componentWillMount(){
		this.props.fetchTasklists(this.props.projectId);
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
	fetchTasklists: projectId => { dispatch(fetchTasklists(projectId)); }
});



export default connect(null, mapDispatchToProps)(TasklistContainer);