import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Confirm, Divider, Grid, Header, Input, List, Message } from 'semantic-ui-react';
import firebase from '../firebase/index';
import MainMenu from './MainMenu';
import * as homePageActions from '../actions/homePageActions';


class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: '',
      open: false,
      successMessage: false,
      failureMessage: false,
    };
    this.show = this.show.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.handlePushNotificationCancel = this.handlePushNotificationCancel.bind(this);
  }

  updateNotification(e) { this.setState({ notification: e.target.value }); }

  sendNotification(e) {
    this.setState({ open: false });
    e.preventDefault();
    console.log('notifcation', this.state.notification);
    const notificationHolder = this.state.notification;
    const notification = notificationHolder;
    const firebaseDatabase = firebase.database();
    if (!notification) return;
    firebaseDatabase.ref('/notifications').push({
      user: 'ADMIN',
      message: notification,
    })
      .then(() => {
        console.log('Notification sent to users!');
        this.setState({ notification: '', successMessage: true });
      })
      .catch(() => {
        console.log('Unable to send notification to Firebase database');
        this.setState({ failureMessage: true });
      });
  }

  handlePushNotificationCancel() {
    this.setState({ open: false });
  }

  show() {
    this.setState({ open: true });
  }

  showSuccessAlert() {
    return (
      <div>
        <Message
          positive
          header="Message successfully sent"
          content="Woohoo! Users are now more informed."
        />
      </div>
    );
  }

  showFailureAlert() {
    return (
      <div>
        <Message
          negative
          header="Hm, something didn't work. Check the logs for more information."
        />
      </div>
    );
  }

  render() {
    return (
      <div className="admin-page">
        <Grid
          style={{ height: '100%' }}
          verticalAlign="middle"
          container
          centered
        >
          <MainMenu />
          <Grid.Row centered>
            {this.state.successMessage ? this.showSuccessAlert() : null }
            {this.state.failureMessage ? this.showFailureAlert() : null }
          </Grid.Row>
          <Grid.Row centered>
            <Header>Welcome, {this.props.state.user.user_username}!</Header>
          </Grid.Row>
          <Grid.Row centered>
            <p>Push notification guidelines:</p>
          </Grid.Row>
          <Grid.Row >
            <List bulleted>
              <List.Item>Must...</List.Item>
              <List.Item>Cannot...</List.Item>
              <List.Item>Consider...</List.Item>
            </List>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row centered>
            <Input
              value={this.state.notification}
              onChange={this.updateNotification}
              style={{ width: '75%' }}
              placeholder="type push notification here"
              type="text"
            />
          </Grid.Row>
          <Grid.Row>
            <Button onClick={this.show}>Send Notification</Button>
            <Confirm
              open={this.state.open}
              content="YOU ARE ABOUT TO SEND THIS TO EVERY USER. Are you sure?"
              onCancel={this.handlePushNotificationCancel}
              onConfirm={this.sendNotification}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

AdminPage.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};


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
