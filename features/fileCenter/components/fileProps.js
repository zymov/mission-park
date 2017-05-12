import React from 'react';
import { connect } from 'react-redux';
import { unselectAll, selectAll } from '../actions';

class FileProps extends React.Component {

	constructor(props){
		super(props);
	}

	handleSelect(e){
		let ele = $(e.target).find('span').andSelf();
		let checkboxs = $('.file-list-item a.check-box span');
		if(ele.hasClass('unselected')){
			this.props.selectAll();
			ele.removeClass('unselected');
			checkboxs.removeClass('unselected');
		} else {
			this.props.unselectAll();
			ele.addClass('unselected');
			checkboxs.addClass('unselected');
		}
	}

	render(){

		return(
			<div className="fc-file-properties" >
				<a className="check-box" onClick={this.handleSelect.bind(this)}>
					<span className="unselected glyphicon glyphicon-ok"></span>
				</a>
				<ul className="clearfix">
					<li className="properties-item prop-name">名称</li>
					<li className="properties-item prop-size">大小</li>
					<li className="properties-item prop-creator">创建者</li>
					<li className="properties-item prop-date">上传时间</li>
				</ul>
			</div>
		);

	}

}

const mapDispatchToProps = dispatch => ({
	unselectAll: () => { dispatch(unselectAll()); },
	selectAll: () => { dispatch(selectAll()); }
})

export default connect(null, mapDispatchToProps)(FileProps);