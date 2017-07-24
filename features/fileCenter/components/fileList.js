import React from 'react';
import { connect } from 'react-redux';
import FileItem from './fileItem';

class FileList extends React.Component {

	render(){

		let files = this.props.filelist.map(function(item){
			return (
				<FileItem key={item._id} file={item} />
			);
		});

		return(
			<div className="file-list">
				<ul className="file-list-ul clearfix">
					{files}
				</ul>
			</div>
		);

	}

}

const mapStateToProps = state => ({
	filelist: state.fileCenter.filelist,
	// filelistLoading: state.fileCenter.filelistLoading
});

export default connect(mapStateToProps, null)(FileList);