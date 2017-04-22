import React from 'react';

class FileInput extends React.Component {

	render(){

		const { icon, handleUpload, id } = this.props.data;
		//multiple ?
		return(
			<div className="fileInputDiv clearfix" >
				<input type="file" id={id} className="inputfile" onChange={handleUpload.bind(this)} />
				<label htmlFor={id} className={`inputfile-label ${icon}`}></label>
			</div>
		);
	}

}

export default FileInput;