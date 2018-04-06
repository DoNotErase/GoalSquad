import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Confirm, Divider, Header, Grid, Loader, Segment, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import MainMenu from '../MainMenu';
import * as actions from '../actions';
import * as homePageActions from './homePageActions';
import { fetchStats, deauthorizeFitbit } from '../actions';
import firebase from '../firebase/index';

class DeetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hideUnsubscribeButton: false,
      hideSubscribeButton: false,
    };
    this.makeDisconnectButton = this.makeDisconnectButton.bind(this);
    this.show = this.show.bind(this);
    this.showUnsubscribeButton = this.showUnsubscribeButton.bind(this);
    this.handlePushNotificationUnsubscribe = this.handlePushNotificationUnsubscribe.bind(this);
    this.handlePushNotificationSubscription = this.handlePushNotificationSubscription.bind(this);
    this.showSubscribeButton = this.showSubscribeButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    if (!props.state.deets.user || props.state.needsUpdate) {
      props.fetchStats();
    }
  }

  makeDisconnectButton() {
    if (this.props.state.user.fitbit_id) {
      return (
        <a href="/logout" >
          <Button onClick={() => {
            this.props.deauthorizeFitbit();
          }}
          >
            Disconnect Fitbit
          </Button>
        </a>
      );
    }
    return <div />;
  }

  show() {
    this.setState({ open: true });
  }

  handlePushNotificationUnsubscribe() {
    this.setState({ open: false, hideUnsubscribeButton: true, hideSubscribeButton: false });
    // make action call to delete token and set preference to false in DB
    this.props.homePageActions.unsubscribeFromPushNotifications(this.props.state.user.id);
    const messaging = firebase.messaging();
    const firebaseDatabase = firebase.database();
    messaging.getToken()
      .then(token => messaging.deleteToken(token))
      .then(() => firebaseDatabase.ref('/tokens').orderByChild('uid').equalTo(this.state.uid).once('value'))
      .then((snapshot) => {
        const key = Object.keys(snapshot.val())[0];
        return firebaseDatabase.ref('/tokens').child(key).remove();
      })
      .catch((err) => {
        console.log('Unable to delete user token from firebase database.', err);
      });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  showUnsubscribeButton() {
    return (
      this.props.state.user.notified_of_push_notifications === 1 && !this.state.hideUnsubscribeButton
        ?
          <div>
            <Header textAlign="right">Push Notifications</Header>
            <Button onClick={this.show} floated="right" negative>Unsubscribe</Button>
            <Confirm
              open={this.state.open}
              content="Clicking OK will unsubscribe you from super awesome push notifications. Are you sure?"
              onConfirm={this.handlePushNotificationUnsubscribe}
              onCancel={this.handleCancel}
            />
          </div>
        :
        null
    );
  }

  handlePushNotificationSubscription() {
    this.setState({ open: false, hideSubscribeButton: true, hideUnsubscribeButton: false });
    this.props.homePageActions.updatePushNotificationsToTrue(this.props.state.user.id);
    const messaging = firebase.messaging();
    const fireBaseDatabase = firebase.database();
    messaging.getToken()
      .then((userToken) => {
        fireBaseDatabase.ref('/tokens').push({
          token: userToken,
          uid: this.state.uid,
        });
      })
      .then(() => {
      });
  }

  showSubscribeButton() {
    return (
      this.props.state.user.notified_of_push_notifications === 1 && !this.state.hideSubscribeButton
        ?
          <div>
            <Header textAlign="right">Push Notifications</Header>
            <Button onClick={this.show} floated="right" positive>Subscribe</Button>
            <Confirm
              open={this.state.open}
              content="Receive push notificaitons and bring your squad to the next level?"
              onConfirm={this.handlePushNotificationSubscription}
              onCancel={this.handleCancel}
            />
          </div>
        :
        null
    );
  }

  render() {
    const { deets } = this.props.state;

    const percentSuccess = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        return Math.ceil((statSet.success * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    const percentFailure = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        return Math.floor((statSet.fail * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    if (!deets.user) {
      return <Loader active inverted size="medium" inline="centered" />;
    }
    return (
      <div className="deetspage">
        <Grid centered>
          <Grid.Row verticalAlign="bottom" columns={2}>
            <Grid.Column mobile={8} tablet={7} computer={4}>
              <MainMenu history={this.props.history} />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={7} computer={4}>
              <Header as="h1" className="white" textAlign="right">Deets</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment.Group raised>
                <Segment compact>
                  <Grid.Row>
                    <Header as="h2">{this.props.state.user.user_username}</Header>
                    {this.props.state.user.wants_push_notifications === 1
                    ? this.showUnsubscribeButton() : this.showSubscribeButton()
                    }
                    {this.state.revealSubscribeButton ? this.showSubscribeButton() : null}
                  </Grid.Row>
                  <Header as="h4">{deets.user.total.attempted} Lifetime Goals </Header>
                  {this.makeDisconnectButton()}
                </Segment>
              </Segment.Group>
              <Segment.Group raised>
                <Segment compact>
                  <Grid centered>
                    <Grid.Row columns={2} centered textAlign="center">
                      <Grid.Column width={8}>
                        <Statistic color="green" size="tiny">
                          <Statistic.Value>
                            {percentSuccess(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>COMPLETE</Statistic.Value>
                        </Statistic>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Statistic
                          color="red"
                          size="tiny"
                          floated="right"
                          style={{ marginRight: 5 }}
                        >
                          <Statistic.Value>
                            {percentFailure(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>FAILED</Statistic.Value>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Segment attached="bottom" compact>
                  <Grid centered>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Statistic horizontal size="mini">
                          <Statistic.Value>
                            {percentSuccess(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                        <Statistic
                          horizontal
                          floated="right"
                          size="mini"
                          style={{ marginRight: 5 }}
                        >
                          <Statistic.Value>
                            {percentFailure(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment.Group>
              <Segment.Group raised>
                {Object.keys(deets.user).map((activity) => {
                  if (activity !== 'total' && activity !== 'custom') {
                    return (
                      <Segment key={activity}>
                        <Statistic
                          key={activity}
                          horizontal
                          size="tiny"
                          label={activity}
                          value={deets.user[activity].amountComplete
                            - deets.user[activity].amountStart}
                        />
                      </Segment>
                    );
                  }
                  return (<div key={activity} />);
                })}
              </Segment.Group>
            </Scrollbars>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

DeetsPage.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  deauthorizeFitbit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    user: PropTypes.object,
    deets: PropTypes.object,
    needsUpdate: PropTypes.bool,
    firebaseUser: PropTypes.object,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  homePageActions: PropTypes.shape({
    updatePushNotificationsToTrue: PropTypes.func,
    unsubscribeFromPushNotifications: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    homePageActions: bindActionCreators(homePageActions, dispatch),
    fetchStats: bindActionCreators(fetchStats, dispatch),
    deauthorizeFitbit: bindActionCreators(deauthorizeFitbit, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DeetsPage);
