import React from 'react';
import { connect } from 'react-redux';
import { closeNotification } from '../../actions';

class Notifications extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		let timer = setTimeout(function(){
			this.props.closeNotification();
			clearTimeout(timer);
		}.bind(this), 3000);
	}

	componentDidUpdate(prevProps, prevState){
		let timer = setTimeout(function(){
			this.props.closeNotification();
			clearTimeout(timer);
		}.bind(this), 3000);
	}

	render(){

		const { message, level } = this.props.notification;

		return (
			<div className="notification" >
				<div className={`notification-${level}`}></div>
				<div className="notification-content">
					{message}
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	showNotification: state.common.showNotification
})

const mapDispatchToProps = dispatch => {
	return ({
		closeNotification: () => { dispatch(closeNotification()); }
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)