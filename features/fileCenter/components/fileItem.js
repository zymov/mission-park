import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatFileSize } from '../../../utils';
import { deleteFile, updateFileItem } from '../actions';

class FileItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			editable: false,
			filename: ''
		}
	}

	changeEditable(){
		this.setState({
			editable: !this.state.editable
		});
	}

	renameFile(e){
		let that = this;
		let val = e.target.value;
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
			editable: false,
			filename: newName
		});
	}

	handleKeyDown(e){
		if(e.which == 13){
			this.renameFile(e);
		}
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
				<div className="clearfix">
					<div className="list-item-detail">
						{
							!this.state.editable && 
								<div className="clearfix">
									<span className="item-icon glyphicon glyphicon-file"></span>
									<div className="item-name" title={`${filenamePart1}${filenamePart2}`} >
										<p>{filenamePart1}</p>
										<p>{filenamePart2}</p>
									</div>
								</div>
						}
						{
							this.state.editable && 
							<div>
								<input type="text" className="form-control editName" 
									defaultValue={filename.replace(`${fileType}`, '')} 
									onBlur={this.renameFile.bind(this)} 
									onKeyDown={this.handleKeyDown.bind(this)} />
							</div>
						}
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
							<a className="handler-item" onClick={this.props.deleteFile.bind(null, file._id)} >删除</a>
						</div>
					</div>
				</div>
			</li>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	deleteFile: fileId => { dispatch(deleteFile(fileId)); },
	updateFileItem: file => { dispatch(updateFileItem(file)); }
});

export default connect(null, mapDispatchToProps)(FileItem);