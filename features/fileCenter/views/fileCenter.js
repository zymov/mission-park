import React from 'react';
import { connect } from 'react-redux';
import FileCenterHead from '../components/fileCenterHead';
import FileProps from '../components/fileProps';
import FileHandler from '../components/fileHandler';
import FileList from '../components/fileList';
import Uploader from '../components/uploader';
import { fetchFiles } from '../actions';
import Spinner from '../../common/components/spinner';

class FileCenter extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: false,
			selectAll: false
		};
	}

	componentWillMount(){
		this.props.fetchFiles(this.props.params.projectId, this.props.currentFolder.folderId);
	}

	render(){

		return(
			<div className="container filecenter">
				<FileCenterHead projectId={this.props.params.projectId} />
				<div className="fc-body" >
					<FileHandler />
					<Spinner show={this.props.filelistLoading} />
					<FileList />
				</div>
				{this.props.uploadFiles.length > 0 && <Uploader />}
			</div>
		);

	}

}

const mapStateToProps = state => ({
	uploadFiles: state.fileCenter.uploadFiles,
	currentFolder: state.fileCenter.currentFolder,
	// selectedItem: state.fileCenter.selectedItem,
	filelistLoading: state.fileCenter.filelistLoading
});

const mapDispatchToProps = dispatch => ({
	fetchFiles: (projectId, folderId) => { dispatch(fetchFiles(projectId, folderId)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileCenter);