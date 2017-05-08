import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentFolder } from '../actions';

class DirectoryItem extends React.Component {

	render(){

		const folder = this.props.folder;

		return(
			<li>
				{folder.folderId != '0' && <span className="forward-slash" >/</span>}
				<span className="folder-name" onClick={this.props.changeCurrentFolder.bind(null, folder)}>{folder.folderName}</span>
			</li>
		);

	}

}


const mapDispatchToProps = dispatch => ({
	changeCurrentFolder: folder => { dispatch(changeCurrentFolder(folder)); }
});

export default connect(null, mapDispatchToProps)(DirectoryItem);