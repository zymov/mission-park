import React from 'react';
import { connect } from 'react-redux';
import FileCenterHead from '../components/fileCenterHead';
import FileProps from '../components/fileProps';
import FileHandler from '../components/fileHandler';
import FileList from '../components/fileList';
import { fetchFiles } from '../actions';

class FileCenter extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: false,
			selectAll: false
		};
	}

	componentWillMount(){
		this.props.fetchFiles(this.props.params.projectId);
	}

	handleClick(e){
		this.setState({
			selected: !this.state.selected
		});
	}

	render(){

		return(
			<div className="container filecenter">
				<FileCenterHead projectId={this.props.params.projectId} />
				<div className="fc-body" onClick={this.handleClick.bind(this)}>
					{!this.state.selected && <FileProps />}
					{this.state.selected && <FileHandler />}
					<FileList />
				</div>
			</div>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	fetchFiles: (projectId) => { dispatch(fetchFiles(projectId)); }
});

export default connect(null, mapDispatchToProps)(FileCenter);