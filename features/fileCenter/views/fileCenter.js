import React from 'react';
import FileCenterHead from '../components/fileCenterHead';
import FileProps from '../components/fileProps';
import FileHandler from '../components/fileHandler';
import FileList from '../components/fileList';

class FileCenter extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: false,
			selectAll: false
		};
	}

	handleClick(e){
		this.setState({
			selected: !this.state.selected
		});
	}

	render(){

		return(
			<div className="container filecenter">
				<FileCenterHead />
				<div className="fc-body" onClick={this.handleClick.bind(this)}>
					{!this.state.selected && <FileProps />}
					{this.state.selected && <FileHandler />}
					<FileList />
				</div>
			</div>
		);

	}

}

export default FileCenter;