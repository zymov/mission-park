import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatFileSize } from '../../../utils';
import { updateFileItem, changeCurrentFolder } from '../actions';
import DeletePopover from './deletePopover';

class FileItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			editable: false,
			deleteFlag: false
		}
		this.documentClick = this.documentClick.bind(this);
	}

	componentDidMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		//!$('.fc-popover')[0].contains(e.target) && e.target.getAttribute('data-refer') != 'delete'
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

	changeEditable(){
		this.setState({
			editable: !this.state.editable
		});
	}

	renameFile(e){
		let that = this;
		let val = e.target.value.trim();
		if(val == ''){
			return;
		}

		let filename = this.props.file.filename;
		let fileType = ~filename.indexOf('.') ? '.' + filename.split('.')[filename.split('.').length -1] : '';
		let newName = `${val}${fileType}`;
		axios.post('/filecenter/rename',{
			newName: newName,
			fileId: this.props.file._id
		})
		.then(function(res){
			that.props.updateFileItem(res.data.file);
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
		console.log(1);
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
				<a className="check-box">{/*<span className="glyphicon glyphicon-ok"></span>*/}</a>
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
						<div className="item-size">{`${formatFileSize(file.length)}`}</div>
						<div className="item-creator" title={fileInfo.creatorName} >{fileInfo.creatorName}</div>
						<div className="item-date">{(new Date(file.uploadDate)).toLocaleDateString()}</div>
						<div className="item-handler" >
							<a className="handler-item" href={`/filecenter/download/?fileId=${file._id}&filename=${filename}`} download >下载</a>
							<a className="handler-item"  >更新</a>
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

const mapDispatchToProps = dispatch => ({
	updateFileItem: file => { dispatch(updateFileItem(file)); },
	changeCurrentFolder: folder => { dispatch(changeCurrentFolder(folder)); }
});

export default connect(null, mapDispatchToProps)(FileItem);