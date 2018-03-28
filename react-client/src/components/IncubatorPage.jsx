import React from 'react';
import { Button, Card, Divider, Grid, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import UserGoalsList from './UserGoalsList';
import ProgressBar from './ProgressBar';
import MainMenu from './MainMenu';
import * as homePageActions from '../actions/homePageActions';
import * as incubatorActions from '../actions/incubatorActions';
import * as squaddieActions from '../actions/squaddieActions';
import * as yardActions from '../actions/yardActions';

class IncubatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
      eggXP: 110,
      firstTime: true,
      eggWasClicked: false,
    };
    this.subtractFromCount = this.subtractFromCount.bind(this);
    this.getGoals = this.getGoals.bind(this);
  }

  componentDidMount() {
    this.props.incubatorActions.getUserGoals();
    this.props.incubatorActions.fetchEggStatus();
    this.props.homePageActions.attemptLogin();
    console.log('stateeeeee',this.props);
  }

  getGoals() {
    return (
      // <div className="no-user-goals">
        <Grid 
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '100%' }}
        >
        <Grid.Column computer={8} mobile={16}> 
          <Grid.Row>
              {/*<div className="circle">
                <span className="char1">O</span>
                <span className="char2">h</span>
                <span className="char3"> </span>
                <span className="char4">n</span>
                <span className="char5">o</span>
                <span className="char6">!</span>
              </div>*/}
              <div className="no-goals-header">Oh no!</div>
          </Grid.Row>
          <Grid.Row>
            <Image size='small' src='./assets/squaddies/squaggle.png' centered/>
          </Grid.Row>
          <Grid.Row>
              <div className="no-goals-body">
                You need some goals! Let's add some.
              </div>
          </Grid.Row>
          <Grid.Row>
              <Button onClick={() => { this.props.history.push('/goals'); }} animated>
                <Button.Content visible>Add goals</Button.Content>
                <Button.Content hidden>
                  <Icon name='plus' />
                </Button.Content>
              </Button>
          </Grid.Row>
        </Grid.Column>
        </Grid>
      // </div>
    )
  }

  subtractFromCount() {
    console.log(this.state.count)
    if(this.state.count === 0) {                                                                                                                                                                  
      this.setState({count: 3});
    }
    this.setState(prevState => {
      return {count: prevState.count - 1};
    })
  }

  hatchTheEggDrWu() {
    this.props.incubatorActions.hatchEgg(this.props.incubatorState.egg.user_egg_id, this.props.incubatorState.egg.egg_xp - 100);  
    setTimeout(() => {
      this.props.yardActions.fetchSquaddies();
    }, 2000);
    setTimeout(() => {
      this.props.squaddieActions.toggleYardStatus(this.props.yardState.newSquaddie.monster_id);
    }, 2000)
    this.setState({firstTime: false});
  }

  openEggModal() {
    if(this.props.incubatorState.egg.egg_xp >= 100 && this.state.firstTime === true) this.hatchTheEggDrWu();
    const classByNumbers = {1: 'eggClass1', 2: 'eggClass2', 3: 'eggClass3'};
    const squaddie = this.props.yardState.newSquaddie;
    return (
      this.props.incubatorState.egg.egg_xp >= 100 
      ?
      <Modal
      trigger={<a><Image className="glowingEgg" src="./assets/icons/egg.png"/></a>}>
        <Modal.Content style={{ background: 'transparent' }}>
          <Card centered>
                {this.state.count === 0 ? <Image src={squaddie.monster_pic}/> : <a><Image size='medium' className={classByNumbers[this.state.count]} onClick={this.subtractFromCount} src='./assets/icons/egg.png' centered/></a>}
            <Card.Content>
              <Card.Header>
                {this.state.count === 0 ? <p>Your new squaddie is {squaddie.monster_name}!</p> : <p>Tap {this.state.count} {this.state.count === 1 ? 'more time' : 'more times'} to reveal your new squaddie!</p> }
              </Card.Header>
              <Card.Description>
                { this.state.count === 0 ? <p>Head over to  <a onClick={() => { this.props.history.push('/yard'); }}>your yard</a> for some well-deserved play time</p>: null }
              </Card.Description>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
      : 
      <Image src="./assets/icons/egg.png" centered />
    )
  }

  render() {
    return (
      <div className="incubatorpage">
        <Header as="h1" className="white" textAlign="right">Your Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
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
          <Grid.Row columns={2} style={{ position: 'fixed', bottom: 0, padding: 1 }}>
            <Grid.Column width={3}>
              {this.openEggModal()}
            </Grid.Column>
            <Grid.Column width={13}>
              <ProgressBar history={this.props.history} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

IncubatorPage.propTypes = {
  // state: PropTypes.shape({
  //   id: PropTypes.string,
  //   username: PropTypes.string,
  // }).isRequired,
  // actions: PropTypes.objectOf(PropTypes.func).isRequired,
  incubatorState: PropTypes.objectOf(PropTypes.object).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
  homePageActions: PropTypes.objectOf(PropTypes.func).isRequired,
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

const mapDispatchToProps = dispatch => (
  {
    homePageActions: bindActionCreators(homePageActions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
    yardActions: bindActionCreators(yardActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    yardState: state.yard,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

