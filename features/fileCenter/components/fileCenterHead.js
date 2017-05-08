import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CurrentDirectory from './currentDirectory';
import { uploadFileSuccess, uploadFileFailure, updateUploadProgress, addUploadFile, updateCompletedCount, createFolder, fetchFiles } from '../actions';
import { getIndexOfArrayByValue, emptyInputValue } from '../../../utils';

class FileCenterHead extends React.Component {

	constructor(props){
		super(props);
		this.user = jwt_decode(localStorage.getItem('token'));
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.currentFolder != this.props.currentFolder){
			this.props.fetchFiles(this.props.projectId, this.props.currentFolder.folderId);
		}
	}


	clickCreateFolder(e){
		let payload = {
			creatorId: this.user.sub,
			creatorName: this.user.name,
			projectId: this.props.projectId,
			folder: this.props.currentFolder
		}
		this.props.createFolder(payload);
	}

	handleInputChange(e){
		// this.props.uploadFile(e);
		let that = this;
		let file = e.target.files[0];
		// let user = jwt_decode(localStorage.getItem('token'));
		let data = new FormData();
		data.append('projectId', this.props.projectId);
		data.append('creatorId', this.user.sub);
		data.append('creatorName', this.user.name);
		data.append('uploadDate', new Date());
		data.append('folderId', this.props.currentFolder.folderId);
		data.append('folderName', this.props.currentFolder.folderName);
		data.append('file', file);
		let progressData = {
			timestamp: Date.now(),
			filename: file.name,
			fileSize: file.size,
			folder: this.props.currentFolder
		}
		axios.post('/filecenter/upload', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: function(progressEvent){
					let percentCompleted = Math.floor( (progressEvent.loaded * 100) / progressEvent.total);
					progressData.percentage = percentCompleted;
					//if file is uploading, just update uploading percentage, otherwise, add new uploading file item in upload list
					// use 'lastModified' may cause error! it just a temporary remedy
					if(~getIndexOfArrayByValue(that.props.uploadFiles, 'timestamp', progressData.timestamp)){ 
						that.props.updateUploadProgress(progressData);
					} else {
						that.props.addUploadFile(progressData);
					}
					if(progressData.percentage == 100){
						that.props.updateCompletedCount();
					}
				}
			})
			.then(function(res){
				that.props.uploadFileSuccess(res.data.file);
			})
			.catch(function(err){
				that.props.uploadFileFailure(err);
			});
	}

	render(){


		return(
			<div className="fc-head">
				<CurrentDirectory />
				<div className="fc-creator clearfix">
					<a className="creator-item" onClick={this.clickCreateFolder.bind(this)} ><span className="glyphicon glyphicon-plus"></span>创建文件夹</a>
					<a className="creator-item" ><span className="glyphicon glyphicon-plus"></span>
						<div className="upload-input">
							<input type="file" id="fc-upload" onClick={emptyInputValue.bind(this)} onChange={this.handleInputChange.bind(this)} />
							<label htmlFor="fc-upload" >上传文件</label>
						</div>
					</a>
				</div>
			</div>
		);

	}

}

const mapStateToProps = state => ({
	uploadFiles: state.fileCenter.uploadFiles,
	currentFolder: state.fileCenter.currentFolder
});

const mapDispatchToProps = dispatch => ({
	uploadFileSuccess: file => { dispatch(uploadFileSuccess(file)); },
	uploadFileFailure: err => { dispatch(uploadFileFailure(err)); },
	updateUploadProgress: data => { dispatch(updateUploadProgress(data)); },
	addUploadFile: data => { dispatch(addUploadFile(data)); },
	updateCompletedCount: () => { dispatch(updateCompletedCount()); },
	createFolder: payload => { dispatch(createFolder(payload)); },
	fetchFiles: (projectId, folderId) => { dispatch(fetchFiles(projectId, folderId)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileCenterHead);