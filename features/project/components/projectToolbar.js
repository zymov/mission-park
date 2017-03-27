import React from 'react';
import { TriggerBtn } from '../../common/components/modal_dialog';
import ProjectModal from './projectModal';
import SearchInput from '../../common/components/searchInput';

class ProjectToolbar extends React.Component {

	render(){
		return(
			<div className="toolbar clearfix" >
				<div className="toolbar-btn">
					<TriggerBtn dataTarget="#addProject" btnName="添加新项目" ></TriggerBtn>
					<ProjectModal />
				</div>
				<SearchInput model="project" attr={{name:"项目名称", modelName: 'projectName'}} />
			</div>
		)
	}

}

export default ProjectToolbar;