import React from 'react';
import { connect } from 'react-redux';
import { formatFileSize } from '../../../utils';
import { deleteFile } from '../actions';

class FileItem extends React.Component {



	render(){
		const file = this.props.file;

		let fileInfo = file.metadata;
		let filenamePart1 = file.filename.slice(0, -6);
		let filenamePart2 = file.filename.slice(-6);

		return(
			<li className="file-list-item clearfix">
				<a className="check-box">{/*<span className="glyphicon glyphicon-ok"></span>*/}</a>
				<div className="clearfix">
					<div className="list-item-detail">
						<span className="item-icon glyphicon glyphicon-file"></span>
						<div className="item-name" title={`${filenamePart1}${filenamePart2}`} >
							<p>{filenamePart1}</p>
							<p>{filenamePart2}</p>
						</div>
					</div>
					<div className="list-item-info">
						<div className="item-size">{`${formatFileSize(file.length)}`}</div>
						<div className="item-creator" title={fileInfo.creatorName} >{fileInfo.creatorName}</div>
						<div className="item-date">{(new Date(file.uploadDate)).toLocaleDateString()}</div>
						<div className="item-handler" >
							<a className="handler-item" href={`/filecenter/download/?filename=${file.filename}`} download >下载</a>
							<a className="handler-item"  >更新</a>
							<a className="handler-item"  >移动</a>
							<a className="handler-item"  >重命名</a>
							<a className="handler-item" onClick={this.props.deleteFile.bind(null, file._id)} >删除</a>
						</div>
					</div>
				</div>
			</li>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	deleteFile: fileId => { dispatch(deleteFile(fileId)); }
});

export default connect(null, mapDispatchToProps)(FileItem);