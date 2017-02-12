import React from 'react';
// import { connect } from 'react-redux';
import Project from '../../project/views/project';

// import {fetchProject} from '../actions';

class Home extends React.Component {

	constructor(props){
		super(props);
	}

	// componentWillMount(){
	// 	this.props.fetchProject();
	// }

	render(){

			return (
					<Project />
			)

	}

}

// const mapDispatchToProps = (dispatch) => {
// 	return ({
// 		fetchProject: () => dispatch(fetchProject())
// 	})
// }

// export default connect(null, mapDispatchToProps)(Home);

export default Home;


