import React from 'react';
// import { connect } from 'react-redux';
import AddTasklist from './addTasklist';
import SearchInput from '../../common/components/searchInput';

class TasklistToolbar extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="btn-group toolbar" role="group" aria-label="Basic example">
			  <AddTasklist projectId={this.props.projectId} />
			  <SearchInput model="tasklist" parentId={this.props.projectId} attr={{name:"任务列表名称", modelName: 'tasklistName'}} />
			</div>
		);
	}

}

// const mapDispatchToProps = dispatch => ({
	
// });

// export default connect(null, mapDispatchToProps)(TasklistToolbar);

export default TasklistToolbar;