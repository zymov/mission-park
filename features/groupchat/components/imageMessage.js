import React from 'react';
import { connect } from 'react-redux';
import { openImgViewer } from '../actions';

class ImageMessage extends React.Component {

	handleClick(e){
		let imgSrc = e.target.src;
		let imgName = e.target.alt;
		let data = {
			src: imgSrc,
			name: imgName
		}
		this.props.openImgViewer(data);
	}

	render(){
		const { src, name } = this.props;
		return(
			<div className="imageMessage">
				<img alt={name} title={name} src={src} onClick={this.handleClick.bind(this)}/>
			</div>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	openImgViewer: (imgData) => { dispatch(openImgViewer(imgData)); }
});

export default connect(null, mapDispatchToProps)(ImageMessage);