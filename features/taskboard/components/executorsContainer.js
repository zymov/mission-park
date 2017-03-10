import React from 'react';
import { connect } from 'react-redux';
import ExecutorLabel from './executorLabel';
import DropdownInput from './dropdown/dropdownInput';
import { getUsersDropdown, closeUsersDropdown } from '../actions/taskActions';

class ExecutorsContainer extends React.Component {

	constructor(props){
		super(props);

		this.documentClick = this.documentClick.bind(this);

	}

	changeExecutors(){
		if(this.props.showUsersDropdown){return;}
		this.props.getUsersDropdown(this.props.projectId);
	}

	componentWillMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		//ReactDOM.findDOMNode(this)
		if(!$('#executorDropdown')[0].contains(e.target)){
			this.props.closeUsersDropdown();
		}
		
	}

	render(){

		const { showUsersDropdown, executors } = this.props;

		var executorList = [];
		executorList = executors.map(function(item, index){
			return <ExecutorLabel key={index} executor={item} removable={true}/>;
		});

		return(
			<ul className="executor-list clearfix">
 				{executorList}
 				<li id="executorDropdown" onClick={this.changeExecutors.bind(this)} >
						<a title="add new executor" className="new-executor glyphicon glyphicon-plus"></a>
 					{ showUsersDropdown && <DropdownInput projectId={this.props.projectId} />}
 				</li>
 			</ul>
		);
	}

}

const mapStateToProps = state => ({
	executors: state.taskboard.task.executors,
	showUsersDropdown: state.taskboard.task.showUsersDropdown
});

const mapDispatchToProps = dispatch => ({
	getUsersDropdown: projectId => { dispatch(getUsersDropdown(projectId)); },
	closeUsersDropdown: () => { dispatch(closeUsersDropdown()); }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExecutorsContainer);