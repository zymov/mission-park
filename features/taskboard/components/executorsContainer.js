import React from 'react';
import { connect } from 'react-redux';
import InfoLabel from './infoLabel';
import DropdownInput from './dropdown/dropdownInput';
import { openUsersDropdown, closeUsersDropdown, addExecutor, removeExecutor } from '../actions/taskActions';
import { fetchUsers, findUsersByName } from '../../common/actions';
import { getIndexOfArray } from '../../../utils';

class ExecutorsContainer extends React.Component {

	constructor(props){
		super(props);

		this.documentClick = this.documentClick.bind(this);

		this.itemClick = this.itemClick.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.labelClick = this.labelClick.bind(this);

	}

	changeExecutors(e){
		if(this.props.showUsersDropdown){return;}
		this.props.openUsersDropdown();
		this.props.fetchUsers(this.props.projectId);

	}

	inputHandler(e){
		this.props.findUsersByName(e.target.value);
	}

	itemClick(user){
		if(getIndexOfArray(this.props.executors, user, '_id') == -1){
			this.props.addExecutor(user);
		} else {
			this.props.removeExecutor(user);		//remove user by it's position(index)? Which method performs better?
		}
	}

	labelClick(executor){
		this.props.removeExecutor(executor);
	}

	componentDidMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		if( !$('#executorDropdown-newTask')[0] || !$('#executorDropdown-editTask')[0]){ return; }
		if( !$('#executorDropdown-newTask')[0].contains(e.target) && !$('#executorDropdown-editTask')[0].contains(e.target) ){
			this.props.closeUsersDropdown();
		}
	}

	render(){

		const { showUsersDropdown, executors, projectUsers, newTaskFlag } = this.props;

		let dropdownInputData = {
			menuList: projectUsers,
			selectedList: executors,
			inputHandler: this.inputHandler,
			btnHandler: null,
			itemClick: this.itemClick
		}


		let dropdownId = 'executorDropdown-' + (newTaskFlag ? 'newTask' : 'editTask');

		var executorList = [];
		executorList = executors.map(function(item){
			return <InfoLabel key={item._id} item={item} removable={true} labelClick={this.labelClick}/>;
		}.bind(this));

		return(
			<ul className="executor-list clearfix">
 				{executorList}
 				<li id={dropdownId} onClick={this.changeExecutors.bind(this)} >
						<a title="add new executor" className="new-executor glyphicon glyphicon-plus"></a>
 					{ showUsersDropdown && <DropdownInput dropdownInputData={dropdownInputData} projectId={this.props.projectId} />}
 				</li>
 			</ul>
		);
	}

}

const mapStateToProps = state => ({
	executors: state.taskboard.task.executors,
	projectUsers: state.common.projectUsers,
	showUsersDropdown: state.taskboard.task.showUsersDropdown
});

const mapDispatchToProps = dispatch => ({
	openUsersDropdown: () => { dispatch(openUsersDropdown()); },
	closeUsersDropdown: () => { dispatch(closeUsersDropdown()); },
	fetchUsers: projectId => { dispatch(fetchUsers(projectId)); },
	findUsersByName: userName => { dispatch(findUsersByName(userName)); },
	addExecutor: user => { dispatch(addExecutor(user)); },
	removeExecutor: user => { dispatch(removeExecutor(user)); }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExecutorsContainer);