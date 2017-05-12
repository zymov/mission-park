import React from 'react';
import { emptyInputValue } from '../../../utils';

class FileInput extends React.Component {

	render(){

		const { icon, handleUpload, id, accept, title, labelText } = this.props.data;
		//multiple ?
		return(
			<div className="fileInputDiv clearfix" >
				<input type="file" id={id} className="inputfile" accept={accept} onClick={emptyInputValue.bind(this)} onChange={handleUpload} />
				<label htmlFor={id} title={title} className={`inputfile-label ${icon}`}>{labelText}</label>
			</div>
		);
	}

}

export default FileInput;