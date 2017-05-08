import React from 'react';
import { connect } from 'react-redux';
import DirectoryItem from './directoryItem';

class CurrentDirectory extends React.Component {

	render(){

		let cd = this.props.folderList.map(function(item, index){
			return <DirectoryItem key={index} folder={item} />;
		});

		return(
			<div className="fc-breadcrumbs">
				<ul className="clearfix">
					{cd}
				</ul>
			</div>
		);

	}

}

const mapStateToProps = state => ({
	folderList: state.fileCenter.folderList
});

export default connect(mapStateToProps, null)(CurrentDirectory);