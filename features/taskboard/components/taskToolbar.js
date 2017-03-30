import React from 'react';
import { connect } from 'react-redux';
import AddTask from './addTask';
import Dropdown from './dropdown/dropdown';
import SearchInput from '../../common/components/searchInput';
import { taskAttrMenuList, getIndexOfArrayByValue } from '../../../utils';
import { searchInput } from '../../common/actions';
import { setSelectedPriority } from '../actions/taskActions';

class TaskToolbar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			taskAttr: {
				name: '任务名称',
				keyName: 'taskName'
			},
			searchInputValue: ''
			// selectedPriority: null
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
		const { taskAttr, searchInputValue } = this.state;

		if(this.props.selectedPriority != priorityLevel){
			this.props.setSelectedPriority(priorityLevel);
			// this.setState({
			// 	selectedPriority: priorityLevel
			// });
			let searchObj = {priority: priorityLevel};
			searchObj[taskAttr.keyName] = searchInputValue;
			this.props.searchInput('task', searchObj, this.props.tasklistId);
		} else {
			this.props.setSelectedPriority(null);
			// this.setState({
			// 	selectedPriority: null
			// });
			let searchObj = {};
			searchObj[taskAttr.keyName] = searchInputValue;
			this.props.searchInput('task', searchObj, this.props.tasklistId);
		}
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		let searchObj = {};
		searchObj[this.state.taskAttr.keyName] = value;
		if(this.props.selectedPriority){
			searchObj['priority'] = this.props.selectedPriority
		}
		this.props.searchInput('task', searchObj, this.props.tasklistId);
	}

	render(){

		const selectedPriority = this.props.selectedPriority;

		return(
			<div className="btn-group toolbar" role="group" aria-label="task toolbar">
		  	<AddTask projectId={this.props.projectId} tasklistId={this.props.tasklistId} />
		  	<div className="toolbar-btn toolbar-search">
			  	<Dropdown dropdown={this.taskAttrDropdown} 
						btnStyle={{}} 
						btnName={this.state.taskAttr.name} />
			  	{/*<SearchInput model="task" parentId={this.props.tasklistId} attr={this.state.taskAttr} />*/}

  				<div className="toolbar-btn" role="group" aria-label="searchInputValue">
					  <input className="form-control" name="searchInputValue" 
			      	placeholder={`按${this.state.taskAttr.name}查找`} 
			      	onChange={this.handleInputChange.bind(this)} 
			      	value={this.state.searchInputValue} />
					</div>

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

const mapStateToProps = state => ({
	selectedPriority: state.taskboard.task.selectedPriority
});

const mapDispatchToProps = dispatch => ({
	searchInput: (model, searchObj, parentId) => { dispatch(searchInput(model, searchObj, parentId)); },
	setSelectedPriority: priority => { dispatch(setSelectedPriority(priority)); }
});


export default connect(mapStateToProps, mapDispatchToProps)(TaskToolbar);