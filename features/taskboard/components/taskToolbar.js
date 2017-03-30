import React from 'react';
import { connect } from 'react-redux';
import AddTask from './addTask';
import Dropdown from './dropdown/dropdown';
import SearchInput from '../../common/components/searchInput';
import { taskAttrMenuList, getIndexOfArrayByValue } from '../../../utils';
import { searchInput, updateCurrentFilter } from '../../common/actions';
import { fetchTasks } from '../actions/taskActions';

class TaskToolbar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			taskAttr: {
				name: '任务名称',
				keyName: 'taskName'
			},
			selectedPriority: null
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
				keyName: taskAttrMenuList[index].keyName
			}
		});
	}

	//filter tasks by priority
	choosePriority(e){
		let priorityLevel = e.target.name;
		if(this.state.selectedPriority != priorityLevel){
			this.props.updateCurrentFilter({priority: priorityLevel});
			this.setState({
				selectedPriority: priorityLevel
			});
			this.props.searchInput(priorityLevel, 'task', 'priority', this.props.tasklistId);
		} else {
			this.setState({
				selectedPriority: null
			});
			this.props.fetchTasks(this.props.tasklistId);
		}
	}

	render(){

		const selectedPriority = this.state.selectedPriority;

		return(
			<div className="btn-group toolbar" role="group" aria-label="task toolbar">
		  	<AddTask projectId={this.props.projectId} tasklistId={this.props.tasklistId} />
		  	<div className="toolbar-btn toolbar-search">
			  	<Dropdown dropdown={this.taskAttrDropdown} 
						btnStyle={{}} 
						btnName={this.state.taskAttr.name} />
			  	<SearchInput model="task" parentId={this.props.tasklistId} attr={this.state.taskAttr} />
		  	</div>
		  	<div className="toolbar-btn priority-btn-group" onClick={this.choosePriority.bind(this)}>
		  		<button name="2" className={`btn bc-error 	${selectedPriority != 2 ? 'not-actived' : ''}`}></button>
		  		<button name="1" className={`btn bc-warning ${selectedPriority != 1 ? 'not-actived' : ''}`}></button>
		  		<button name="0" className={`btn bc-normal 	${selectedPriority != 0 ? 'not-actived' : ''}`}></button>
		  	</div>
			</div>
		);
	}

}


const mapDispatchToProps = dispatch => ({
	searchInput: (value, model, attr, parentId) => { dispatch(searchInput(value, model, attr, parentId)); },
	fetchTasks: tasklistId => { dispatch(fetchTasks(tasklistId)); },
	updateCurrentFilter: obj => { dispatch(updateCurrentFilter(obj)); }
});


export default connect(null, mapDispatchToProps)(TaskToolbar);