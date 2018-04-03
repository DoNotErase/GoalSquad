import React from 'react';
import { bindActionCreators } from 'redux';


class adminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notification: ''
		}
	}

	updateNotification(e) { this.setState({ notification: e.target.value }); }

	sendNotification(e) {
  		e.preventDefault();
  		let notification  = this.props.notification;
  		if ( !notification ) return;

  		FIREBASE_DATABASE.ref('/notifications').push({
      		user: 'ADMIN',
      		message: notification,
    	})
    		.then(() => {
      		this.setState({ notification: '' });
    		})
    		.catch(() => {
      		console.log("Unable to send notification to Firebase database")
    		});
}

	render() {
		return (
			<div>
				<input value={this.state.notification} onChange={this.updateNotification} type="text"/>
				<input type="submit" onClick={this.sendNotification(e)}/>
			</div>
		)
	}


}


