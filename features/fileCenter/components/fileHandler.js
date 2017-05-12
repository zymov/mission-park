import React from 'react';
import { connect } from 'react-redux';
import { unselectAll, selectAll, deleteFile, setSelectedItemAmountToZero } from '../actions';

class FileHandler extends React.Component {

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

	handleMultiDownload(){
		this.props.selectedItem.forEach(function(item){
			$(`a[href="/filecenter/download/?fileId=${item.fileId}&filename=${item.filename}"]`)[0].click();
		});
	}

	handleMultiDelete(){
		this.props.selectedItem.forEach(function(item){
			this.props.deleteFile(item.fileId);
		}.bind(this));
		this.props.setSelectedItemAmountToZero(0);
		$('.file-list-item a.check-box span').addClass('unselected');
	}

	render(){

		const { selectedItem, filelist } = this.props;

		return(
			<div className="fc-file-handler clearfix">
				<a className="check-box" onClick={this.handleSelect.bind(this)}>
					<span className={`${filelist.length == selectedItem.length && selectedItem.length != 0 ? '' : 'unselected'} glyphicon glyphicon-ok`}></span>
				</a>
				{
					selectedItem.length ? 
					<div className="handler-group">
						<p className="selected-count">已选择{selectedItem.length}项</p>
						<a className="handler-item" onClick={this.handleMultiDownload.bind(this)} >下载</a>
						<a className="handler-item" >移动</a>
						<a className="handler-item" onClick={this.handleMultiDelete.bind(this)} >删除</a>
					</div>
					:
					<ul className="clearfix">
						<li className="properties-item prop-name">名称</li>
						<li className="properties-item prop-size">大小</li>
						<li className="properties-item prop-creator">创建者</li>
						<li className="properties-item prop-date">上传时间</li>
					</ul>
				}
			</div>
		);

	}

}

const mapStateToProps = state => ({
	selectedItem: state.fileCenter.selectedItem,
	filelist: state.fileCenter.filelist
});

const mapDispatchToProps = dispatch => ({
	unselectAll: () => { dispatch(unselectAll()); },
	selectAll: () => { dispatch(selectAll()); },
	deleteFile: fileId => { dispatch(deleteFile(fileId)); },
	setSelectedItemAmountToZero: () => { dispatch(setSelectedItemAmountToZero()); }
})

export default connect(mapStateToProps, mapDispatchToProps)(FileHandler);