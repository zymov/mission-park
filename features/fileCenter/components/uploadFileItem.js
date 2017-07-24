import React from 'react';
// import { connect } from 'react-redux';
import { formatFileSize } from '../../../utils';

class UploadFileItem extends React.Component {

	render(){

		const { filename, folder, percentage, fileSize } = this.props.fileInfo;

		let filenamePart1 = filename.slice(0, -6);
		let filenamePart2 = filename.slice(-6);

		let completedFileSize = formatFileSize(percentage/100*fileSize);
		let totalFileSize = formatFileSize(fileSize);

		return(
			<li className="upload-item">
				<div className="upload-file-item">
					<header className="upload-file-icon glyphicon glyphicon-file" ></header>
					<div className="upload-filename" title={filename} >
						<p>{filenamePart1}</p>
						<p>{filenamePart2}</p>
					</div>
					<div className="upload-progressbar">
						<div className="upload-progress" style={{width: `${percentage}%`}}></div>
					</div>
					<div className="upload-info">
						<p className="upload-filesize">{`(${completedFileSize}/${totalFileSize})`}</p>
						<p className="upload-folder">上传至 {folder.folderName}</p>
					</div>
				</div>
				<div className="upload-handler">
					{/*<a className="delete-upload-file">×</a>*/}
				</div>
			</li>
		);

	}

}

// export default connect(null, mapDispatchToProps)(UploadFileItem);
export default UploadFileItem;