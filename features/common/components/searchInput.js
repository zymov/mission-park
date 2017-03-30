import React from 'react';
import { connect } from 'react-redux';
import { searchInput } from '../actions';

class SearchInput extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			search: ''
		}
	}


	handleInputChange(event){
		const { model, attr, parentId } = this.props;
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		this.props.searchInput(value, model, attr.keyName, parentId);
	}

	render(){
		return(
			<div className="toolbar-btn" role="group" aria-label="search">
			  <input className="form-control" name="search" 
        	placeholder={`按${this.props.attr.name}查找`} 
        	onChange={this.handleInputChange.bind(this)} 
        	value={this.state.search} />
			</div>
		);
	}

}


const mapDispatchToProps = dispatch => ({
	searchInput: (value, model, keyName, parentId) => { dispatch(searchInput(value, model, keyName, parentId)); }	
});


export default connect(null, mapDispatchToProps)(SearchInput);
