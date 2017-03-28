import React from 'react';
// import { connect } from 'react-redux';
import AddTask from './addTask';
import Dropdown from './dropdown/dropdown';
import SearchInput from '../../common/components/searchInput';
import { taskAttrMenuList, getIndexOfArrayByValue } from '../../../utils';

class TaskToolbar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			taskAttr: {
				name: '任务名称',
				modelName: 'taskName'
			}
		}

		this.taskAttrDropdown = {
			menuList: taskAttrMenuList,
			btnId: 'taskAttrDropdown',
			handleClick: this.selectTaskAttr.bind(this),
			dropdownIcon: true
		}
	}

	selectTaskAttr(e){
		let target = e.target;
		if(!target.name) { return; }
		let index = getIndexOfArrayByValue(taskAttrMenuList, 'name', target.name)		//any better way ???
		this.setState({
			taskAttr: {
				name: target.name,
				modelName: taskAttrMenuList[index].modelName
			}
		});
	}

	render(){
		return(
			<div className="btn-group toolbar" role="group" aria-label="Basic example">
		  	<AddTask projectId={this.props.projectId} tasklistId={this.props.tasklistId} />
		  	<div className="toolbar-btn toolbar-search">
			  	<Dropdown dropdown={this.taskAttrDropdown} 
						btnStyle={{}} 
						btnName={this.state.taskAttr.name} />
			  	<SearchInput model="task" parentId={this.props.tasklistId} attr={this.state.taskAttr} />
		  	</div>
			</div>
		);
	}

}


// const mapDispatchToProps = dispatch => ({
	
// })


// export default connect(null, mapDispatchToProps)(TasklistToolbar);
export default TaskToolbar;