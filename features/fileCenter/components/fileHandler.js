import React from 'react';

class FileHandler extends React.Component {

	render(){

		return(
			<div className="fc-file-handler clearfix">
				<a className="check-box">
					{ false/*this.state.selectAll*/ && <span className="glyphicon glyphicon-ok"></span> }
				</a>
				<p className="selected-count">已选择1项</p>
				<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>下载</a>
				<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>更新</a>
				<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>移动</a>
				<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>复制</a>
				<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>删除</a>
			</div>
		);

	}

}

export default FileHandler;