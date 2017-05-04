import React from 'react';
import { connect } from 'react-redux';
import FileItem from './fileItem';

class FileList extends React.Component {

	render(){

		let files = this.props.filelist.map(function(item, index){
			return (
				<FileItem key={index} file={item} />
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
	filelist: state.fileCenter.filelist
});

export default connect(mapStateToProps, null)(FileList);