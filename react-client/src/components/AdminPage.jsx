import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Divider, Grid, Header, Input }  from 'semantic-ui-react';
import firebase from '../firebase/index';
import MainMenu from './MainMenu';
import * as homePageActions from '../actions/homePageActions';


class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notification: '',
			open: false,
		}
		this.sendNotification = this.sendNotification.bind(this);
		this.updateNotification = this.updateNotification.bind(this);
		this.show = this.show.bind(this);
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
  				console.log('Notification sent to users!')
    			this.setState({ notification: '' });
    			this.showSuccessAlert();
  		})
  		.catch((err) => {
    			console.log("Unable to send notification to Firebase database");
    			this.showFailureAlert(err);
  		});
	}

	handlePushNotificationCancel() {
			this.setState({ open: false });
	}

	handlePushNotificationSend() {
			this.sendNotification();
			this.setState({ open: false });
	}

	showSuccessAlert() {
		return (
			<div>
				<Message positive>
				    <Message.Header>Message successfully sent</Message.Header>
				    <p>Woohoo, our users are now more informed!</p>
				  </Message>
			</div>
		)
	}

	showFailureAlert(err) {
		return (
			<div>
				<Message negative>
				    <Message.Header>Hm, something didn't work. Check the logs below for more information.</Message.Header>
				    <p>{ err }</p>
				  </Message>
			</div>
		)
	}

	render() {
		const styles = {
			container: {
				marginTop: '100px'
			}
		}
		return (
			<div className="admin-page">
				<Grid 
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
				container
				>
				<MainMenu />
					<Grid.Row centered>
						<Header>Welcome, {this.props.state.user.user_username}</Header>
						<p>Send push notifications to our users below!</p>
						<Divider />
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
						<Button onClick={this.show}>Send Notification</Button>
              <Confirm
                open={this.state.open}
                content="YOU ARE ABOUT TO SEND THIS TO EVERY USER. Are you sure?"
                onCancel={this.handlePushNotificationCancel}
                onConfirm={this.handlePushNotificationSend}
              />
				  </Grid.Row>
				</Grid>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => (
  {
    homePageActions: bindActionCreators(homePageActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);


