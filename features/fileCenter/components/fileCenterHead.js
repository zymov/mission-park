import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { uploadFileSuccess, uploadFileFailure } from '../actions';

class FileCenterHead extends React.Component {

	handleChange(e){
		// this.props.uploadFile(e);
		let that = this;
		let file = e.target.files[0];
		let user = jwt_decode(localStorage.getItem('token'));
		let data = new FormData();
		data.append('projectId', this.props.projectId);
		data.append('creatorId', user.sub);
		data.append('creatorName', user.name);
		data.append('uploadDate', new Date());
		data.append('file', file);
		axios.post('/filecenter/upload', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
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
				<div className="fc-breadcrumbs">
					<ul className="clearfix">
						<li>文件库</li>
						{/*<li><span className="forward-slash" >/</span>new folder</li>*/}
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
	uploadFileSuccess: file => { dispatch(uploadFileSuccess(file)); },
	uploadFileFailure: err => { dispatch(uploadFileFailure(err)); }
});

export default connect(null, mapDispatchToProps)(FileCenterHead);