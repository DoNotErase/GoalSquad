import React from 'react';
import { Button, Card, Divider, Grid, Header, Loader, Image, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import IntermediateAdminPage from '../Admin/IntermediateAdminPage';
import MainMenu from '../MainMenu';
import ProgressBar from './ProgressBar';
import UserGoalsList from './UserGoalsList';
import * as homePageActions from '../HomePageDeets/homePageActions';
import * as incubatorActions from './incubatorActions';
import * as squaddieActions from '../SquaddieYard/squaddieActions';
import firebase from '../firebase/index';

class IncubatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
      open: false,
      openModal: true,
      openNotificationModal: true,
      dimmer: false,
    };
    this.show = this.show.bind(this);
    this.handlePushNotificationCancel = this.handlePushNotificationCancel.bind(this);
    this.handlePushNotificationConfirm = this.handlePushNotificationConfirm.bind(this);
    this.subtractFromCount = this.subtractFromCount.bind(this);
    this.getGoals = this.getGoals.bind(this);
    this.hatchImage = this.hatchImage.bind(this);
    this.eggImage = this.eggImage.bind(this);
    this.close = this.close.bind(this);
    this.showNotifcation = this.showNotifcation.bind(this);
    this.showPushNotificationModal = this.showPushNotificationModal.bind(this);
  }

  componentDidMount() {
    if (this.props.state.user) {
      this.props.homePageActions.attemptLogin();
    }
    // get goals if user is logged in and there are no goals or is flagged for update
    if (this.props.state.user &&
      (!this.props.incubatorState.userGoals || this.props.incubatorState.needsUpdate)) {
      this.props.incubatorActions.getUserGoals();
      this.props.incubatorActions.fetchEggStatus();
    }
  }

  getGoals() {
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '100%' }}
      >
        {this.props.incubatorState.isLoading ? <Loader active inverted size="medium" inline="centered" /> :
        <Grid.Column computer={8} tablet={10} mobile={16}>
          <Grid.Row>
            <Header size="large" className="white">Oh no!</Header>
            <Divider hidden />
          </Grid.Row>
          <Grid.Row>
            <Image size="small" src="./assets/squaddies/grumpkin.png" centered />
            <Divider hidden />
          </Grid.Row>
          <Grid.Row>
            <Header size="medium" className="white">
                You need some goals! Let's add some.
            </Header>
            <Divider hidden />
          </Grid.Row>
          <Grid.Row>
            <Button basic inverted onClick={() => { this.props.history.push('/goals'); }}>
              <Button.Content visible>Add goals</Button.Content>
            </Button>
          </Grid.Row>
        </Grid.Column>
        }
      </Grid>
    );
  }

  handlePushNotificationCancel() {
    this.props.homePageActions.updatePushNotificationsToFalse(this.props.state.user.id);
    // temporarily set push notification to true to remove button
    this.setState({ open: false, openModal: false });
    console.log('User did not allow permission');
  }

  handleTokenRefresh() {
    const messaging = firebase.messaging();
    const fireBaseDatabase = firebase.database();
    messaging.getToken()
      .then((userToken) => {
        fireBaseDatabase.ref('/tokens').push({
          token: userToken,
          uid: this.props.state.firebaseUser.uid,
        });
        this.props.homePageActions.updatePushNotificationsToTrue(this.props.state.user.id);
      });
  }

  handlePushNotificationConfirm() {
    // temporarily set push notification to true to remove button
    this.setState({ openModal: false });
    this.handleTokenRefresh();
  }

  show() {
    this.setState({ open: true });
  }

  showNotifcation() {
    this.setState({ openNotificationModal: false });
  }

  showPushNotificationModal() {
    return (
      !this.props.state.user.notified_of_push_notifications && this.state.openNotificationModal
        ?
          <div>
            <Modal
              style={{ background: 'transparent' }}
              dimmer={this.state.dimmer}
              open={!this.props.state.user.notified_of_push_notifications && this.state.openModal}
              onClose={this.close}
              className="fadeIn"
            >
              <Modal.Header>What are your thoughts on push notifications?</Modal.Header>
              <Modal.Content>You can always subscribe/unsubscribe in your deets page.</Modal.Content>
              <Modal.Actions>
                <Button labelPosition="left" content="Nah" onClick={this.handlePushNotificationCancel} />
                <Button labelPosition="right" content="Sign me up" onClick={this.handlePushNotificationConfirm} />
              </Modal.Actions>
            </Modal>
          </div>
        :
        null
    );
  }

  glowingEggActivated() {
    return this.state.glowingEgg ? 'glowingEgg' : '';
  }

  subtractFromCount() {
    if (this.state.count === 3) {
      const { egg } = this.props.incubatorState;
      this.props.incubatorActions.hatchEgg(egg.user_egg_id, egg.egg_xp - 100);
    }
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }

  eggImage() {
    if (this.props.incubatorState.egg.egg_xp >= 100) {
      return (<Image
        inline
        className="glow"
        src="./assets/icons/egg_stage_1.png"
        onClick={() => this.setState({ open: true, dimmer: true })}
      />);
    }
    return (
      <Image inline className="egg" src="./assets/icons/egg_stage_1.png" />
    );
  }

  hatchImage() {
    const pictureByCount = {
      1: './assets/icons/egg_stage_3.png',
      2: './assets/icons/egg_stage_2.png',
      3: './assets/icons/egg_stage_1.png',
    };
    if (this.state.count >= 1) {
      return (
        <Image
          size="medium"
          onClick={this.subtractFromCount}
          src={pictureByCount[this.state.count]}
          centered
        />
      );
    }
    return (
      <Image
        size="medium"
        src={this.props.newSquaddie.monster_pic}
        centered
      />
    );
  }

  close() {
    this.setState({ open: false, dimmer: false });
  }

  render() {
    const styles = {
      position: {
        top: 15,
        right: 15,
        position: 'fixed',
      },
    };
    return (
      this.props.state.user.role === 'admin'
        ?
          <IntermediateAdminPage history={this.props.history} />
        :
          <div className="incubatorpage">
            <Grid centered>
              {this.props.state.firebaseUser && this.props.state.firebaseUser.uid
            ? this.showPushNotificationModal()
            : null
          }
              <Grid.Row verticalAlign="bottom" columns={2}>
                <Grid.Column mobile={8} tablet={7} computer={4}>
                  <MainMenu history={this.props.history} />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={7} computer={4}>
                  <Header as="h1" className="white" textAlign="right">Your Goals</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Column computer={8} tablet={10} mobile={16}>
                <Scrollbars autoHide style={{ height: '75vh' }}>
                  {Object.keys(this.props.incubatorState.userGoals).length > 0
                ? Object.keys(this.props.incubatorState.userGoals).map(activity => (
                  <UserGoalsList
                    key={activity}
                    activityType={activity}
                    goals={this.props.incubatorState.userGoals[activity]}
                  />
              ))
                : this.getGoals()
              } {/* renders list of goals for each activity type */}
                </Scrollbars>
              </Grid.Column>
              <Grid.Row
                columns={2}
                verticalAlign="top"
                style={{ position: 'fixed', bottom: 0, padding: 1 }}
              >
                <Grid.Column mobile={3} tablet={2} computer={1}>
                  {this.eggImage()}
                </Grid.Column>
                <Grid.Column mobile={13} tablet={12} computer={7} style={{ marginTop: 15 }}>
                  <ProgressBar
                    history={this.props.history}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Modal
              style={{ background: 'transparent' }}
              dimmer={this.state.dimmer}
              open={this.state.open}
              onClose={this.close}
              className="fadeIn"
            >
              <Modal.Content style={{ background: 'transparent' }}>
                <Card
                  centered
                  style={{ backgroundImage: styles.eggBackground }}
                >
                  {this.hatchImage()}
                  <Card.Content
                    style={{ backgroundColor: 'white' }}
                  >
                    <Card.Header>
                      {this.state.count === 0 && this.props.newSquaddie ?
                        <p> Your new Squaddie is {this.props.newSquaddie.monster_name}! </p>
                  :
                        <p>Tap {this.state.count} {this.state.count === 1 ? 'more time' : 'more times'} to reveal your new Squaddie!</p>
                  }
                    </Card.Header>
                    <Card.Description>
                      {this.state.count === 0 ?
                        <p> Head over to
                          <a onClick={() => { this.props.history.push('/yard'); }}> your yard </a>
                          for some well-deserved play time
                        </p>
                  :
                    null
                  }
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Modal.Content>
            </Modal>
          </div>
    );
  }
}

IncubatorPage.propTypes = {
  state: PropTypes.shape({
    needsUpdate: PropTypes.bool, // really bool 0/1
    user: PropTypes.object,
    firebaseUser: PropTypes.object,
  }).isRequired,
  incubatorState: PropTypes.shape({
    userGoals: PropTypes.object,
    needsUpdate: PropTypes.bool,
    isLoading: PropTypes.bool,
    egg: PropTypes.object,
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
  homePageActions: PropTypes.objectOf(PropTypes.func).isRequired,
  newSquaddie: PropTypes.shape({
    monster_id: PropTypes.number,
    monster_name: PropTypes.string,
    monster_pic: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    homePageActions: bindActionCreators(homePageActions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    yardState: state.yard,
    incubatorState: state.incubator,
    newSquaddie: state.squaddies.newSquaddie,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

