import React from 'react';

class FileItem extends React.Component {

	render(){
		const { file, creatorName, creatorId } = this.props.fileData;

		let filenamePart1 = file.filename.slice(0, -6);
		let filenamePart2 = file.filename.slice(-6);

		return(
			<li className="file-list-item clearfix">
				<a className="check-box">{/*<span className="glyphicon glyphicon-ok"></span>*/}</a>
				<div className="clearfix">
					<div className="list-item-detail">
						<span className="item-icon glyphicon glyphicon-file"></span>
						<div className="item-name">
							<p>{filenamePart1}</p>
							<p>{filenamePart2}</p>
						</div>
					</div>
					<div className="list-item-info">
						<div className="item-size">{`${file.length} B`}</div>
						<div className="item-creator">{creatorName}</div>
						<div className="item-date">{file.uploadDate}</div>
						<div className="item-handler">
							<a className="handler-item" >下载</a>
							<a className="handler-item" >更新</a>
							<a className="handler-item" >移动</a>
							<a className="handler-item" >重命名</a>
							<a className="handler-item" >删除</a>
						</div>
					</div>
				</div>
			</li>
		);

	}

}

export default FileItem;