import React from 'react';
import { connect } from 'react-redux';
import { deleteFile } from '../actions';

class DeletePopover extends React.Component {

	render(){

		return(
			<div className="fc-popover">
				<header className="fc-popover-head">
					<p>删除文件</p>
				</header>
				<div className="fc-popover-body">
					<p>确定要永久删除此文件吗？</p>
					<button className="btn btn-danger" onClick={this.props.deleteFile.bind(null, this.props.fileId)}>删除</button>
				</div>
			</div>
		);

	}

}


const mapDispatchToProps = dispatch => ({
	deleteFile: fileId => { dispatch(deleteFile(fileId)); }
});

export default connect(null, mapDispatchToProps)(DeletePopover);

















