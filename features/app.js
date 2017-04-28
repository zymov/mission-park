import React from 'react';
import { connect } from 'react-redux';
import Navbar from './homePage/views/navbar';
import SignIn from './userSign/views/signin';
import {checkUserSignin} from '../utils';
import ImgViewer from './groupchat/components/imgViewer';

class App extends React.Component {
	render(){

		const { showImgViewer, imgData } = this.props;

		if(!checkUserSignin()){
			return (<SignIn />);
		} else {
			return (
				<div>
					<Navbar />
	        {this.props.children}
	        { showImgViewer && <ImgViewer imgData={imgData} /> }
	      </div>
			)
		}
	}
}

const mapStateToProps = state => ({
	showImgViewer: state.groupchat.showImgViewer,
	imgData: state.groupchat.imgData
});

export default connect(mapStateToProps, null)(App);