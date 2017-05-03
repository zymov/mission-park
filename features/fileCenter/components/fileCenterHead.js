import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { uploadFile } from '../actions';

class FileCenterHead extends React.Component {

	handleChange(e){
		this.props.uploadFile(e);
	}

	render(){

		return(
			<div className="fc-head">
				<div className="fc-breadcrumbs">
					<ul className="clearfix">
						<li>文件库</li>
						<li><span className="forward-slash" >/</span>new folder</li>
					</ul>
				</div>
				<div className="fc-creator clearfix">
					<a className="creator-item" ><span className="glyphicon glyphicon-plus"></span>创建文件夹</a>
					<a className="creator-item" ><span className="glyphicon glyphicon-plus"></span>
						<div className="upload-input">
							<input type="file" id="fc-upload" onChange={this.handleChange.bind(this)} />
							<label htmlFor="fc-upload" >上传文件</label>
						</div>
					</a>
				</div>
			</div>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	uploadFile: payload => { dispatch(uploadFile(payload)); }
});

export default connect(null, mapDispatchToProps)(FileCenterHead);