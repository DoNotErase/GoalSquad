import React from 'react';
import { Button, Card, Confirm, Grid,  Icon, Link, Modal, Row } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as homePageActions from '../actions/homePageActions';
import firebase from '../firebase/index';

const src = './assets/icons/';
const menustyles = {
  top: 15,
  left: 15,
  position: 'fixed',
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
};

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      notifiedOfPushNotifications: false,
    };
    this.show = this.show.bind(this);
    this.handlePushNotificationCancel = this.handlePushNotificationCancel.bind(this);
    this.handlePushNotificationConfirm = this.handlePushNotificationConfirm.bind(this);
  }

  handlePushNotificationCancel() {
    this.props.homePageActions.updatePushNotificationsToFalse(this.props.state.user.id);
    // temporarily set push notification to true to remove button
    this.setState({ open: false, notifiedOfPushNotifications: true });
    console.log('User did not allow permission')
  }

  handleTokenRefresh() {
    let messaging = firebase.messaging();
    messaging.getToken()
      .then((token) => {
        this.props.homePageActions.updatePushNotificationsToTrue(this.props.state.user.id, token);
    });
  }

  handlePushNotificationConfirm() {
    // temporarily set push notification to true to remove button
    this.setState({ open: false, notifiedOfPushNotifications: true });
    this.handleTokenRefresh();
  }

  show() {
    this.setState({ open: true })
  }

  showPushNotificationButton() {
    return (
      <div>
          <Button onClick={this.show} floated='right'>Enable Push Notifications</Button>
          <Confirm
            open={this.state.open}
            content='Would you like to receive occassional but super helpful push notifcations?'
            onCancel={this.handlePushNotificationCancel}
            onConfirm={this.handlePushNotificationConfirm}
          />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Grid>
          {this.state.notifiedOfPushNotifications
            ? null
            : this.props.state.user.notified_of_push_notifications ? null : <Grid.Row> {this.showPushNotificationButton()} </Grid.Row>
          }
          <Grid.Row>
            <Modal
              className="fadeIn"
              size="tiny"
              trigger={
                <Button
                  icon
                  circular
                  size="huge"
                  style={menustyles}
                >
                  <Icon name="tasks" inverted />
                </Button>}
            >
              <Modal.Content>
                <Card.Group itemsPerRow={3} centered>
                  <Card raised image={`${src}yard_icon.png`} onClick={() => { props.history.push('/yard'); }} />
                  <Card raised image={`${src}incubator_icon.png`} onClick={() => { props.history.push('/incubator'); }} />
                  <Card raised image={`${src}goals_icon.png`} onClick={() => { props.history.push('/goals'); }} />
                  <Card raised image={`${src}deets_icon.png`} onClick={() => { props.history.push('/deets'); }} />
                  <Card raised image={`${src}squad_icon.png`} onClick={() => { props.history.push('/squad'); }} />
                  <Card raised image={`${src}battle_icon.png`} onClick={() => { props.history.push('/lobby'); }} />
                  <Card raised image={`${src}logout_icon.png`} onClick={Link} href="/logout" />
                </Card.Group>
              </Modal.Content>
            </Modal>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

MainMenu.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { 
    actions: bindActionCreators(actions, dispatch),
    homePageActions: bindActionCreators(homePageActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
