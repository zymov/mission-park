import React from 'react';

class FileProps extends React.Component {

	render(){

		return(
			<div className="fc-file-properties" >
				<a className="check-box">
					{ false/*this.state.selectAll*/ && <span className="glyphicon glyphicon-ok"></span> }
				</a>
				<ul className="clearfix">
					<li className="properties-item prop-name">名称</li>
					<li className="properties-item prop-size">大小</li>
					<li className="properties-item prop-creator">创建者</li>
					<li className="properties-item prop-date">上传时间</li>
				</ul>
			</div>
		);

	}

}

export default FileProps;