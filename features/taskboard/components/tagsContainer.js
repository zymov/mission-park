import React from 'react';
import { connect } from 'react-redux';
import DropdownInput from './dropdown/dropdownInput';
import { addTag, removeTag, openTagsDropdown, closeTagsDropdown } from '../actions/taskActions';
import { fetchTags, findTagByName } from '../../common/actions';

class TagsContainer extends React.Component {

	constructor(props){
		super(props);

		this.documentClick = this.documentClick.bind(this);
		this.itemClick = this.itemClick.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.labelClick = this.labelClick.bind(this);

	}

	changeTags(e){
		if(this.props.showTagsDropdown){return;}
		this.props.openTagsDropdown();
		this.props.fetchTags(this.props.projectId);

	}

	inputHandler(e){
		this.props.findTagByName(e.target.value);
	}

	itemClick(tag){
		if(getIndexOfArray(this.props.tags, tag, '_id') == -1){
			this.props.addTag(tag);
		} else {
			this.props.removeTag(tag);		//remove user by it's position(index)? Which method performs better?
		}
	}

	labelClick(tag){
		this.props.removeTag(tag);
	}

	componentDidMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		if( !$('#tagDropdown-newTask')[0].contains(e.target) && !$('#tagDropdown-editTask')[0].contains(e.target) ){
			this.props.closeTagsDropdown();
		}
		
	}

	render(){

		const { showTagsDropdown, allTags, selectedTags, newTaskFlag } = this.props;

		let dropdownInputData = {
			menuList: allTags,
			selectedList: selectedTags,
			inputHandler: this.inputHandler,
			btnHandler: null,
			itemClick: this.itemClick
		}

		let dropdownId = 'tagDropdown-' + (newTaskFlag ? 'newTask' : 'editTask');

		var tagsList = [];
		tagsList = selectedTags.map(function(item, index){
			return <InfoLabel key={index} item={item} removable={true} labelClick={this.labelClick} />;
		}.bind(this));

		return(
			<ul className="executor-list clearfix">
 				{tagsList}
 				<li id={dropdownId} onClick={this.changeTags.bind(this)} >
						<a title="add new executor" className="new-executor glyphicon glyphicon-plus"></a>
 					{ showTagsDropdown && <DropdownInput dropdownInputData={dropdownInputData} projectId={this.props.projectId} />}
 				</li>
 			</ul>
		);
	}

}

const mapStateToProps = state => ({
	allTags: state.common.allTags,
	selectedTags: state.taskboard.task.selectedTags,
	showTagsDropdown: state.taskboard.task.showTagsDropdown
});

const mapDispatchToProps = dispatch => ({
	openTagsDropdown: () => { dispatch(openTagsDropdown()); },
	closeTagsDropdown: () => { dispatch(closeTagsDropdown()); },
	fetchTags: () => { dispatch(fetchTags()); },
	findTagByName: tagName => { dispatch(findTagByName(tagName)); },
	addTag: tag => { dispatch(addTag(tag)); },
	removeTag: tag => { dispatch(removeTag(tag)); }
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);