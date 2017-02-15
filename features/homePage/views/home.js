import React from 'react';
// import { connect } from 'react-redux';
import ProjectList from '../../project/views/projectList';

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
					<ProjectList />
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


