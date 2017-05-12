import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatFileSize, getIndexOfArrayByValue, getArrayOfSpecKey } from '../../../utils';
import { 
	updateFileName, changeCurrentFolder, 
	updateUploadProgress, addUploadFile, 
	updateCompletedCount, updateFileSuccess, 
	updateFileFailure, selectItem, unselectItem } from '../actions';
import DeletePopover from './deletePopover';
import FileInput from '../../common/components/fileInput';

class FileItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			editable: false,
			deleteFlag: false
		}
		this.user = jwt_decode(localStorage.getItem('token'));
		this.documentClick = this.documentClick.bind(this);
		this.fileinputData = {
			handleUpload: this.handleUpload.bind(this),
			icon: '',
			id: `update_file_${this.props.file._id}`,
			accept: '',
			title: 'update file',
			labelText: '更新'
		};
	}

	componentDidMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		let element = $('.fc-popover:visible')[0];
		if(!element){return;}
		if(e.target.getAttribute('data-refer') != 'delete' && e.target !== element && !element.contains(e.target)){
			this.setState({
				deleteFlag: false
			});
		}
		//set the deleteFlag to false to remove the popover, otherwise it would be still shown on the next file, I don't know why...
		if(e.target.getAttribute('data-refer') == 'delete-confirmed'){
			this.setState({
				deleteFlag: false
			});
		}
	}

	handleSelect(e){
		let payload = {
			fileId: this.props.file._id,
			filename: this.props.file.filename
		}
		let ele = $(e.target).find('span').andSelf();
		if(ele.hasClass('unselected')){
			this.props.selectItem(payload);
			ele.removeClass('unselected');
		} else {
			this.props.unselectItem(payload);
			ele.addClass('unselected');
		}
	}

	handleUpload(e){
		// this.props.uploadFile(e);
		let that = this;
		let oldFile = this.props.file;
		let newFile = e.target.files[0];

		let data = new FormData();
		data.append('fileId', oldFile._id);
		data.append('uploadDate', new Date());
		data.append('file', newFile);
		let progressData = {
			timestamp: Date.now(),
			filename: newFile.name,
			fileSize: newFile.size,
			folder: this.props.currentFolder
		}
		axios.post('/filecenter/update', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: function(progressEvent){
				let percentCompleted = Math.floor( (progressEvent.loaded * 100) / progressEvent.total);
				progressData.percentage = percentCompleted;
				//if file is uploading, just update uploading percentage, otherwise, add new uploading file item in upload list
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
			that.props.updateFileSuccess(oldFile._id, res.data.newFile);
		})
		.catch(function(err){
			that.props.updateFileFailure(err);
		});
	}

	changeEditable(){
		this.setState({
			editable: !this.state.editable
		});
	}

	renameFile(e){
		let that = this;
		let val = e.target.value.trim();
		if(val == ''){ return; }
		let filename = this.props.file.filename;
		let fileType = ~filename.indexOf('.') ? '.' + filename.split('.')[filename.split('.').length -1] : '';
		let newName = `${val}${fileType}`;
		axios.post('/filecenter/rename',{
			newName: newName,
			fileId: this.props.file._id
		})
		.then(function(res){
			that.props.updateFileName(res.data.file);
		})
		.catch(function(err){
			console.log(err);
		});
		this.setState({
			editable: false
		});
	}

	handleKeyDown(e){
		if(e.which == 13){
			this.renameFile(e);
		}
	}

	handleClickItem(e){
		if(this.props.file.length || e.target.tagName.toLocaleLowerCase() == 'input'){
			return;
		}
		let payload = {
			folderId: this.props.file._id,
			folderName: this.props.file.filename
		}
		this.props.changeCurrentFolder(payload);
	}

	clickDeleteFile(e){
		this.setState({
			deleteFlag: true
		});
	}

	render(){
		const file = this.props.file;

		let fileInfo = file.metadata;
		let filename = file.filename;
		let filenamePart1 = filename.slice(0, -6);
		let filenamePart2 = filename.slice(-6);
		let fileType = ~filename.indexOf('.') ? '.' + filename.split('.')[filename.split('.').length -1] : '';

		return(
			<li className="file-list-item clearfix" >
				<a className="check-box" onClick={this.handleSelect.bind(this)}>
					<span className="unselected glyphicon glyphicon-ok"></span>
				</a>
				<div className="clearfix" >
					<div className="list-item-detail">
						<div className="clearfix" onClick={this.handleClickItem.bind(this)}>
							{
								file.length == 0 ? 
								<span className="item-icon glyphicon glyphicon-folder-close"></span> : 
								<span className="item-icon glyphicon glyphicon-file"></span> 
							}
							{
							!this.state.editable && 
								<div className="item-name" title={filename} >
									<span>{filenamePart1}</span>
									<span>{filenamePart2}</span>
								</div>
							}
							{
							this.state.editable && 
								<input type="text" className="form-control editName" 
									defaultValue={filename.replace(`${fileType}`, '')} 
									onBlur={this.renameFile.bind(this)} 
									onKeyDown={this.handleKeyDown.bind(this)} />
							}
						</div>
					</div>
					<div className="list-item-info">
						<div className="item-size">{`${file.length ? formatFileSize(file.length) : ''}`}</div>
						<div className="item-creator" title={fileInfo.creatorName} >{fileInfo.creatorName}</div>
						<div className="item-date">{(new Date(file.uploadDate)).toLocaleDateString()}</div>
						<div className="item-handler" >
							<a className="handler-item" href={`/filecenter/download/?fileId=${file._id}&filename=${filename}`} download >下载</a>
							{
								!!file.length && 
								<a className="handler-item" >
									<FileInput data={this.fileinputData} />
								</a>
							}
							<a className="handler-item"  >移动</a>
							<a className="handler-item" onClick={this.changeEditable.bind(this)} >重命名</a>
							<a className="handler-item" data-refer="delete" onClick={this.clickDeleteFile.bind(this)} >删除</a>
							{this.state.deleteFlag && <DeletePopover file={file} />}
						</div>

					</div>
				</div>
			</li>
		);

	}

}

const mapStateToProps = state => ({
	folderList: state.fileCenter.folderList,
	currentFolder: state.fileCenter.currentFolder,
	uploadFiles: state.fileCenter.uploadFiles
});

const mapDispatchToProps = dispatch => ({
	selectItem: payload => { dispatch(selectItem(payload)); },
	unselectItem: payload => { dispatch(unselectItem(payload)); },
	updateFileName: file => { dispatch(updateFileName(file)); },
	changeCurrentFolder: folder => { dispatch(changeCurrentFolder(folder)); },
	updateUploadProgress: data => { dispatch(updateUploadProgress(data)); },
	addUploadFile: data => { dispatch(addUploadFile(data)); },
	updateCompletedCount: () => { dispatch(updateCompletedCount()); },
	updateFileSuccess: (oldFileId, file) => { dispatch(updateFileSuccess(oldFileId, file)); },
	updateFileFailure: err => { dispatch(updateFileFailure(err)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileItem);