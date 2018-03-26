import React from 'react';
import { Button, Card, Divider, Grid, Header, Image, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import UserGoalsList from './UserGoalsList';
import ProgressBar from './ProgressBar';
import MainMenu from './MainMenu';
import * as homePageActions from '../actions/homePageActions';
import * as incubatorActions from '../actions/incubatorActions';


class IncubatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
      chosenOne: null,
      eggXP: 110
    }
    this.subtractFromCount = this.subtractFromCount.bind(this);
    this.hatchEgg = this.hatchEgg.bind(this);
  }

  componentDidMount() {
    this.props.incubatorActions.getUserGoals();
    this.props.homePageActions.attemptLogin();
    console.log('stateeeeee',this.props)
  }

  getGoals() {
    return (
      <div>
        It looks like you don't have any goals yet! Let's fix that.
      </div>
    )
  }

  subtractFromCount() {
    console.log(this.state.count)
    if(this.state.count === 1) {
      this.setState({count: 3});
      this.hatchEgg();
      // show link to yard page (already a link to it but be explicit about it)
      return;
    }
    this.setState((prevState, props) => {
      return {count: prevState.count - 1};
    })
  }

  // getRandomSquaddie() {
  //   let squaddies = ['bard', 'kow', 'pruny', 'scuttlebutt', 'squaggle'] // MVP approach to this--refactor to make dynamic
  //   let userSquaddies = [] // grab user squaddies, 
  //   let squaddiesYetToBeHad = [] // make an an array from the monsters the user doesn't have (based n the total array above)
  //   let max = Math.floor(squaddies.length - 1);
  //   let rand = Math.floor(Math.random() * (max  + 1)); 
  //   let chosenOne = squaddiesYetToBeHad[rand];
  //   // add chosenOne to their list of monsters
  //   return chosenOne; // or generic image since they apparently have all? Or message alerting them that they have all squaddies
  // }

  hatchEgg() {
    this.setState({chosenOne: this.props.incubatorActions.hatchEgg(this.props.incubatorState.egg.egg_xp - 100)});
  }

  openEggModal() {
    return (
      // this.props.incubatorState.egg.egg_xp >= 100 
      this.state.eggXP >= 100 
      ?
      <Modal
      trigger={<a><Image className="glowingEgg" src="./assets/icons/egg.png" /></a>}>
        <Modal.Content style={{ background: 'transparent' }}>
          <Card centered>
            {this.state.count > 1 ? <a><Image onClick={this.subtractFromCount} src='./assets/icons/egg.png'/></a> : <a><Image src={this.state.chosenOne.monster_pic}/></a>}
            <Card.Content>
            {this.state.count > 1 
              ? <Card.Header>Tap {this.state.count} {this.state.count === 1 ? 'more time' : 'more times'} to reveal your new squaddie!</Card.Header>
              : <Card.Header>Your new squaddie is {this.state.chosenOne.monster_name}!</Card.Header>
            }
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
      : 
      <Image src="./assets/icons/egg.png" centered />
    )
  }

  render() {
    const styles = {
      cardBackground: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffeff1, #fff8ff, #ffffff)'
    };
    return (
      <div className="incubatorpage">
        <Header as="h1" className="white" textAlign="right">Your Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '75vh' }}>
            {}
              {Object.keys(this.props.incubatorState.userGoals).map(activity => (
                <UserGoalsList
                  key={activity}
                  activityType={activity}
                  goals={this.props.incubatorState.userGoals[activity]}
                />
              ))
              // : this.getGoals()
              } {/* renders list of goals for each activity type */}
            </Scrollbars>
          </Grid.Column>
          <Grid.Row columns={2} style={{ position: 'fixed', bottom: 0, padding: 1 }}>
            <Grid.Column width={3}>
              {this.openEggModal()}
              {/*<Image onClick={this.addToCount} src="./assets/icons/egg.png" centered />*/}
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
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

