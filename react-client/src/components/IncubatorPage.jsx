import React from 'react';
import { Grid, Header, Divider, Image } from 'semantic-ui-react';
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
      count: 0
    }
    this.addToCount = this.addToCount.bind(this);
    
  }

  componentDidMount() {
    this.props.incubatorActions.getUserGoals();
    this.props.homePageActions.attemptLogin();
  }

  getGoals() {
    return (
      <div>
        It looks like you don't have any goals yet! Let's fix that.
        <Button />
      </div>
    )
  }

  addToCount() {
    console.log(this.state.count)
    if(this.state.count === 2) {
      this.setState({count: 0});
      return;
    }
    this.setState((prevState, props) => {
      return {count: prevState.count + 1};
    })
  }

  render() {
    const userGoals = Object.keys(this.props.incubatorState.userGoals) ? Object.keys(this.props.incubatorState.userGoals) : null;
    return (
      <div className="incubatorpage">
        <Header as="h1" className="white" textAlign="right">Your Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '75vh' }}>
            {}
              { userGoals ?
                Object.keys(this.props.incubatorState.userGoals).map(activity => (
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
              <Image onClick={this.addToCount} src="./assets/icons/egg.png" centered />
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

