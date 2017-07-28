import React from 'react';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader } from '../../common/components/modal_dialog';
import { deleteProject } from '../actions';

class DeleteProjectModal extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			projectName: '',
			inputVal: '',
			inputDisplay: 'none',
			inputError: false
		}
	}

	componentDidMount(){
		$('body').on('click', '[data-target="#deleteProject"]', this.clickHandler.bind(this));
	}

	clickHandler(){
		this.setState({
			inputVal: '',
			inputDisplay: 'none',
			inputError: false
		})
	}

	componentWillUnmount(){
		$('body').off('click', '[data-target="#deleteProject"]', this.clickHandler.bind(this));
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.project.projectName){
			this.setState({
				projectName: nextProps.project.projectName
			});
		}
		this.setState({
			inputVal: '',
			inputDisplay: 'none',
			inputError: false
		});
	}

	handleInputChange(e){
		this.setState({
			inputVal: e.target.value,
			inputError: false
		});
	}

	handleClick(e){
		if(this.state.inputDisplay == 'none'){
			this.setState({
				inputDisplay: 'block'
			});
		} else if(this.state.inputVal == this.props.project.projectName){
			this.props.deleteProject(this.props.project._id);
			this.setState({
				inputVal: '',
				inputDisplay: 'none',
				inputError: false
			});
			$('#deleteProject').click();
		} else {
			this.setState({
				inputError: true
			});
		}
	}

	render(){

		return(
			<ModalWrapper id="deleteProject">
				<ModalHeader deleteProject />
				<div className="modal-body">
	        <p>{`一旦你删除了项目「${this.state.projectName}」，所有与项目有关的信息将会被永久删除。这是一个不可恢复的操作，请谨慎对待！`}</p>
	      </div>
	      <div className="modal-footer double-check">
	      	<input className={`form-control ${this.state.inputError ? 'common-error-input' : ''}`} 
	      		name="projectName" 
		        placeholder="项目名称" 
		        onChange={this.handleInputChange.bind(this)} 
		        value={this.state.inputVal} 
		        style={{display: `${this.state.inputDisplay}`}} />
	        <button type="button" className="btn btn-danger flexBtn" onClick={this.handleClick.bind(this)} >删除</button>
	      </div>
			</ModalWrapper>
		)

	}

}

const mapDispatchToProps = dispatch => ({
	deleteProject: projectId => dispatch(deleteProject(projectId))
});

export default connect(null, mapDispatchToProps)(DeleteProjectModal);