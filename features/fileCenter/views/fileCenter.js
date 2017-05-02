import React from 'react';

class FileCenter extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: false,
			selectAll: false
		};
	}

	handleClick(e){
		this.setState({
			selected: !this.state.selected
		});
	}

	render(){

		return(
			<div className="container filecenter">
				<div className="fc-head">
					<div className="fc-breadcrumbs">
						<ul className="clearfix">
							<li>文件库</li>
							<li><span className="forward-slash" >/</span>new folder</li>
						</ul>
					</div>
					<div className="fc-creator clearfix">
						<a className="creator-item" ><span className="glyphicon glyphicon-plus"></span>创建文件夹</a>
						<a className="creator-item" ><span className="glyphicon glyphicon-plus"></span>上传文件</a>
					</div>
				</div>
				<div className="fc-body" onClick={this.handleClick.bind(this)}>
					{
						!this.state.selected && 
						<div className="fc-file-properties" >
							<a className="check-box">
								{ this.state.selectAll && <span className="glyphicon glyphicon-ok"></span> }
							</a>
							<ul className="clearfix">
								<li className="properties-item prop-name">名称</li>
								<li className="properties-item prop-size">大小</li>
								<li className="properties-item prop-creator">创建者</li>
								<li className="properties-item prop-date">更新时间</li>
							</ul>
						</div>
					}
					{
						this.state.selected && 
						<div className="fc-file-handler clearfix">
							<a className="check-box">
								{ this.state.selectAll && <span className="glyphicon glyphicon-ok"></span> }
							</a>
							<p className="selected-count">已选择1项</p>
							<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>下载</a>
							<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>更新</a>
							<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>移动</a>
							<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>复制</a>
							<a className="handler-item" ><span className="glyphicon glyphicon-download"></span>删除</a>
						</div>
					}
				
					<div className="file-list">
						<ul className="file-list-ul clearfix">
							<li className="file-list-item clearfix">
								<a className="check-box"><span className="glyphicon glyphicon-ok"></span></a>
								<div className="clearfix">
									<div className="list-item-detail">
										<span className="item-icon glyphicon glyphicon-file"></span>
										<div className="item-name">
											<p>ab</p>
											<p>c.html</p>
										</div>
									</div>
									<div className="list-item-info">
										<div className="item-size">4 KB</div>
										<div className="item-creator">zym</div>
										<div className="item-date">今天</div>
										<div className="item-handler">
											<a className="handler-item" >下载</a>
											<a className="handler-item" >更新</a>
											<a className="handler-item" >移动</a>
											<a className="handler-item" >重命名</a>
											<a className="handler-item" >删除</a>
										</div>
									</div>
								</div>
							</li>
							<li className="file-list-item clearfix">
								<a className="check-box"><span className="glyphicon glyphicon-ok"></span></a>
								<div className="clearfix">
									<div className="list-item-detail">
										<span className="item-icon glyphicon glyphicon-file"></span>
										<div className="item-name">
											<p>阿三参数</p>
											<p>擦擦.pdf</p>
										</div>
									</div>
									<div className="list-item-info">
										<div className="item-size">2.7 MB</div>
										<div className="item-creator">Alice</div>
										<div className="item-date">今天</div>
										<div className="item-handler">
											<a className="handler-item" >下载</a>
											<a className="handler-item" >更新</a>
											<a className="handler-item" >移动</a>
											<a className="handler-item" >重命名</a>
											<a className="handler-item" >删除</a>
										</div>
									</div>
								</div>
							</li>
							<li className="file-list-item clearfix">
								<a className="check-box"><span className="glyphicon glyphicon-ok"></span></a>
								<div className="clearfix">
									<div className="list-item-detail">
										<span className="item-icon glyphicon glyphicon-file"></span>
										<div className="item-name">
											<p>阿三采访</p>
											<p>的非.mp4</p>
										</div>
									</div>
									<div className="list-item-info">
										<div className="item-size">27 MB</div>
										<div className="item-creator">Smith</div>
										<div className="item-date">2月7日</div>
										<div className="item-handler">
											<a className="handler-item" >下载</a>
											<a className="handler-item" >更新</a>
											<a className="handler-item" >移动</a>
											<a className="handler-item" >重命名</a>
											<a className="handler-item" >删除</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);

	}

}

export default FileCenter;