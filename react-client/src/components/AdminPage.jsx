import React from 'react';
import { bindActionCreators } from 'redux';
import { Button, Grid, Header, Input }  from 'semantic-ui-react';
import firebase from '../firebase/index';

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notification: ''
		}
		this.sendNotification = this.sendNotification.bind(this);
		this.updateNotification = this.updateNotification.bind(this);
	}

	updateNotification(e) { this.setState({ notification: e.target.value }); }

	sendNotification(e) {
  		e.preventDefault();
  		console.log('notifcation', this.state.notification)
  		let notification  = this.state.notification;
  		let firebase_database = firebase.database();
  		if ( !notification ) return;

  		firebase_database.ref('/notifications').push({
      		user: 'ADMIN',
      		message: notification,
    	})
  		.then(() => {
    			this.setState({ notification: '' });
  		})
  		.catch(() => {
    			console.log("Unable to send notification to Firebase database");
  		});
	}

	render() {
		return (
			<div>
				<Grid 
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
				container
				>
					<Grid.Row centered>
						<Header>Welcome, Admin user</Header>
					</Grid.Row>
				  <Grid.Row centered>
				    <Input
				      value={this.state.notification}
				      onChange={this.updateNotification}
				      style={{ width: '75%' }}
				      label={{ basic: true }}
				      placeholder="type push notification here"
				      labelPosition="left"
				      type="text"
				    />
						<Button color="grey" onClick={this.sendNotification}>
						  Send
						</Button>
				  </Grid.Row>
				</Grid>
			</div>
		)
	}
}

export default AdminPage;


