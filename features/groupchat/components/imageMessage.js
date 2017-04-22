import React from 'react';

class ImageMessage extends React.Component {

	render(){
		const { src, name } = this.props;
		return(
			<div className="imageMessage">
				<img alt={name} title={name} src={src} />
			</div>
		);

	}

}

export default ImageMessage;