import React from 'react';
import { connect } from 'react-redux';
import DirectoryItem from './directoryItem';

class CurrentDirectory extends React.Component {

	componentDidUpdate(){
		if(this.props.folderList.length > 0){
			$('#fc-directory li:last-child')[0].scrollIntoView();
		}
	}

	render(){

		let cd = this.props.folderList.map(function(item, index){
			return <DirectoryItem key={index} folder={item} />;
		});

		return(
			<div className="fc-breadcrumbs">
				<ul className="clearfix" id="fc-directory">
					{cd}
				</ul>
				<div className="directory-slider">

				</div>
			</div>
		);

	}

}

const mapStateToProps = state => ({
	folderList: state.fileCenter.folderList
});

export default connect(mapStateToProps, null)(CurrentDirectory);