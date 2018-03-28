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
  componentDidMount() {
    if (this.props.state.user) {
      this.props.homePageActions.attemptLogin();
    }
    // get goals if user is logged in and there are no goals or is flagged for update
    if (this.props.state.user &&
      (!this.props.incubatorState.userGoals || this.props.incubatorState.needsUpdate)) {
      this.props.incubatorActions.getUserGoals();
    }
  }

  render() {
    return (
      <div className="incubatorpage">
        <Header as="h1" className="white" textAlign="right">Your Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '75vh' }}>
              {Object.keys(this.props.incubatorState.userGoals).map(activity => (
                <UserGoalsList
                  key={activity}
                  activityType={activity}
                  goals={this.props.incubatorState.userGoals[activity]}
                />
              ))} {/* renders list of goals for each activity type */}
            </Scrollbars>
          </Grid.Column>
          <Grid.Row columns={2} style={{ position: 'fixed', bottom: 0, padding: 1 }}>
            <Grid.Column width={3}>
              <Image src="./assets/icons/egg.png" centered />
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
  state: PropTypes.shape({
    needsUpdate: PropTypes.bool, // really bool 0/1
    user: PropTypes.object,
  }).isRequired,
  incubatorState: PropTypes.shape({
    userGoals: PropTypes.object,
    needsUpdate: PropTypes.bool,
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
  homePageActions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
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

