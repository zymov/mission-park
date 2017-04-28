import React from 'react';
import { connect } from 'react-redux';
import { closeImgViewer } from '../actions';

class ImgViewer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			zoom: 1
		}
	}

	clickMask(e){
		if(e.target.contains($('.img-viewer-wrapper img')[0])){
			this.props.closeImgViewer();
		} else {
			return;
		}
	}

	componentDidMount(){
		let imgWrapper = $('.img-viewer-wrapper')[0];
		this.setState({
			width: imgWrapper.offsetWidth,
			height: imgWrapper.offsetHeight
		});
	}

	zoomImg(flag){
		let imgWrapper = $('.img-viewer-wrapper')[0];
		imgWrapper.style.width = (this.state.zoom + flag*.1)*this.state.width + 'px';
		imgWrapper.style.height = (this.state.zoom + flag*.1)*this.state.height + 'px';
		this.setState({
			zoom: this.state.zoom + flag*.1
		});
	}

	render(){

		const { src, name } = this.props.imgData;

		return(
			<div className="img-viewer-mask" onClick={this.clickMask.bind(this)}>
				<div className="img-viewer-wrapper" >
					<img src={src} alt={name}/>
				</div>
				<div className="img-viewer-tool">
					<span className="glyphicon glyphicon-plus" onClick={this.zoomImg.bind(this, 1)}></span>
					<span className="glyphicon glyphicon-minus" onClick={this.zoomImg.bind(this, -1)}></span>
					<a className="glyphicon glyphicon-cloud-download" href={src} download={name}></a>
				</div>
			</div>
		);
	}

}

const mapDispatchToProps = dispatch => ({
	closeImgViewer: () => { dispatch(closeImgViewer()); }
});

export default connect(null, mapDispatchToProps)(ImgViewer);