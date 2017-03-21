import React from 'react';
import { connect } from 'react-redux';
import DropdownInput from './dropdown/dropdownInput';
import InfoLabel from './infoLabel';
import { addTag, removeTag, openTagsDropdown, closeTagsDropdown, invalidInput } from '../actions/taskActions';
import { fetchTags, findTagsByName, saveTag } from '../../common/actions';
import { getIndexOfArray, getIndexOfArrayByValue } from '../../../utils';

class TagsContainer extends React.Component {

	constructor(props){
		super(props);

		this.changeTags = this.changeTags.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.btnHandler = this.btnHandler.bind(this);
		this.itemClick = this.itemClick.bind(this);
		this.labelClick = this.labelClick.bind(this);
		this.documentClick = this.documentClick.bind(this);

	}

	changeTags(e){
		if(this.props.showTagsDropdown){return;}
		this.props.openTagsDropdown();
		this.props.fetchTags(this.props.projectId);
	}

	inputHandler(e){
		this.props.findTagsByName(e.target.value);
	}

	btnHandler(e){
		let inputValue = e.target.previousSibling.value;
		if(!inputValue || ~this.props.selectedTags.indexOf(inputValue)){return;}
		if(inputValue.length > 20){
			this.props.invalidInput({type: 'maxLength', maxLength: 20}); 
			e.target.previousSibling.value = '';
			e.target.previousSibling.focus();
			this.props.fetchTags(this.props.projectId);
			return;
		}
		this.props.addTag(inputValue);
		this.props.saveTag(inputValue, this.props.projectId);
		e.target.previousSibling.value = '';
		this.props.fetchTags(this.props.projectId);
	}

	itemClick(tag){
		let	idx = this.props.selectedTags.indexOf(tag);
		if(idx == -1){
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
		if( !$('#tagDropdown-newTask')[0] || !$('#tagDropdown-editTask')[0]){ return; }
		if( !$('#tagDropdown-newTask')[0].contains(e.target) && !$('#tagDropdown-editTask')[0].contains(e.target) ){
			this.props.closeTagsDropdown();
		}
		
	}

	render(){

		const { showTagsDropdown, projectTags, selectedTags, newTaskFlag } = this.props;

		let dropdownInputData = {
			menuList: projectTags,
			selectedList: selectedTags,
			inputHandler: this.inputHandler,
			btnHandler: this.btnHandler,
			itemClick: this.itemClick
		}

		let dropdownId = 'tagDropdown-' + (newTaskFlag ? 'newTask' : 'editTask');

		var tagsList = [];
		tagsList = selectedTags.map(function(item, index){
			return <InfoLabel key={index} item={item} removable={true} labelClick={this.labelClick} />;
		}.bind(this));

		return(
			<ul className="tag-list clearfix">
 				{tagsList}
 				<li id={dropdownId} onClick={this.changeTags} >
						<a title="add new tag" className="new-tag glyphicon glyphicon-plus"></a>
 					{ showTagsDropdown && <DropdownInput dropdownInputData={dropdownInputData} projectId={this.props.projectId} />}
 				</li>
 			</ul>
		);
	}

}

const mapStateToProps = state => ({
	projectTags: state.common.projectTags,
	selectedTags: state.taskboard.task.selectedTags,
	showTagsDropdown: state.taskboard.task.showTagsDropdown
});

const mapDispatchToProps = dispatch => ({
	openTagsDropdown: () => { dispatch(openTagsDropdown()); },
	closeTagsDropdown: () => { dispatch(closeTagsDropdown()); },
	fetchTags: () => { dispatch(fetchTags()); },
	findTagsByName: tagName => { dispatch(findTagsByName(tagName)); },
	addTag: tagName => { dispatch(addTag(tagName)); },
	removeTag: tagName => { dispatch(removeTag(tagName)); },
	saveTag: (tagName, projectId) => { dispatch(saveTag(tagName, projectId)); },
	invalidInput: (errorType) => { dispatch(invalidInput(errorType)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);