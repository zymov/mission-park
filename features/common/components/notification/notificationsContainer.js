import React from 'react';
import Notification from './notification';
class NotificationsContainer extends React.Component {

	render(){
		return (
			<div className="notifications-container notifications-container-bottomLeft">
				{this.props.children}
			</div>
		);
	}

}

export default NotificationsContainer;