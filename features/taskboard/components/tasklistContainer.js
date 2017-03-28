import React from 'react';
import { connect } from 'react-redux';
import { fetchTasklists } from '../actions/tasklistActions';

class TasklistContainer extends React.Component {

	componentWillMount(){
		this.props.fetchTasklists(this.props.projectId);
	}
	render(){
		return(
			<div className="list-group">
				{this.props.children}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	fetchTasklists: projectId => { dispatch(fetchTasklists(projectId)); }
});

export default connect(null, mapDispatchToProps)(TasklistContainer);