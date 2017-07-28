import React from 'react';
import { connect } from 'react-redux';
import { TriggerBtn } from '../../common/components/modal_dialog';
import ProjectModal from './projectModal';
import SearchInput from '../../common/components/searchInput';
import { removeEditingProject } from '../actions';

class ProjectToolbar extends React.Component {

	componentDidMount(){
		$('body').on('click', '[data-target="#addProject"]', this.clickHandler.bind(this));
	}

	clickHandler(){
		this.props.removeEditingProject();
	}

	componentWillUnmount(){
		$('body').off('click', '[data-target="#addProject"]', this.clickHandler.bind(this));
	}

	render(){

		return(
			<div className="toolbar clearfix" >
				<div className="toolbar-btn">
					<TriggerBtn dataTarget="#addProject" btnName="添加新项目" ></TriggerBtn>
					<ProjectModal createProject project={{}} />
				</div>
				<SearchInput model="project" attr={{name:"项目名称", keyName: 'projectName'}} />
			</div>
		)
	}

}

const mapDispatchToProps = dispatch => ({
	removeEditingProject: () => dispatch(removeEditingProject())
})

export default connect(null, mapDispatchToProps)(ProjectToolbar);