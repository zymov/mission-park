import React from 'react';

export default class ModalHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="modal-header">
      	<h5 className="modal-title">
      	创建新任务{this.props.createList ? '列表' : ''}{this.props.createTo ? '至' + this.props.createTo : ''}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
		)
	}
}