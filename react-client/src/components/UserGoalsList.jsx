import React from 'react';
import { Grid, Segment, Header, Statistic, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as incubatorActions from '../actions/incubatorActions';

const UserGoalsList = (props) => {
  const makeDeadLineMessage = (goal) => {
    const nowUTC = moment();
    const deadline = moment(goal.user_goal_end_date).subtract(5, 'hours');
    const days = deadline.diff(nowUTC, 'days');
    if (days >= 1) {
      return `${(days + 1)} days`;
    }
    const hours = deadline.diff(nowUTC, 'hours');
    if (hours >= 1) {
      return `${(hours + 1)} hours`;
    }
    return `${deadline.diff(nowUTC, 'minutes') + 1} minutes`;
  };

  const activityName = (goalActivity) => {
    switch (goalActivity) {
      case 'distance':
        return 'Miles';
      case 'floors':
        return 'Flights';
      case 'steps':
        return 'steps';
      default:
        return 'activity not recognized';
    }
  };

  const statusIndicator = (goal) => {
    if (goal.user_goal_concluded && !goal.user_goal_finalized) {
      if (goal.user_goal_success) {
        return (
          <Button onClick={() => { props.incubatorActions.markGoalSuccess(goal.user_goal_id); }}>
            Goal Success!
          </Button>);
      }
      return (
        <Button onClick={() => { props.incubatorActions.markGoalFailure(goal.user_goal_id); }}>
          Goal Failed :(
        </Button>);
    }
    if (goal.user_goal_finalized) {
      if (goal.user_goal_success) {
        return <div> You failed this goal :( </div>;
      }
      return <div> You passed this goal! </div>;
    }
    if (goal.user_goal_end_date) {
      return (
        <Grid.Row columns={2}>
          <Grid.Column >
            <Header as="h4">{goal.goal_name}</Header>
            {makeDeadLineMessage(goal)} left!
          </Grid.Column>
          <Grid.Column >
            <Statistic
              floated="right"
              size="mini"
            >
              <Statistic.Value>
                {goal.user_goal_target - goal.user_goal_current} {activityName(goal.goal_activity)}
              </Statistic.Value>
              <Statistic.Label>
                to go!
              </Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      );
    }
    return (
      <Grid.Row columns={2}>
        <Grid.Column >
          <Header as="h4">{goal.goal_name}</Header>
        </Grid.Column>
        <Grid.Column >
          <Statistic
            floated="right"
            size="mini"
          >
            <Statistic.Value>
              {goal.user_goal_target - goal.user_goal_current} {activityName(goal.goal_activity)}
            </Statistic.Value>
            <Statistic.Label>
              to go!
            </Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>
    );
  };

  if (props.goals) {
    return (
      <Segment.Group raised>
        {props.goals.map(goal => (
          <Segment
            key={goal.user_goal_id}
            compact
            clearing
          >
            <Grid>
              {/* <Header as="h4">{goal.goal_name}</Header> */}
              {statusIndicator(goal)}

            </Grid>
          </Segment>))
            }
      </Segment.Group>

    );
  }
  return (
    <span>You have no goals!</span>
  );
};

UserGoalsList.propTypes = {
  // state: PropTypes.shape({
  //   steps: PropTypes.number,
  //   distance: PropTypes.number,
  //   stairs: PropTypes.number,
  // }).isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  incubatorActions: PropTypes.shape({
    markGoalSuccess: PropTypes.func,
    markGoalFailure: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

const mapDispatchToProps = dispatch => (
  {
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(UserGoalsList);
