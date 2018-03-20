import React from 'react';
import { Grid, Segment, Header, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

const UserGoalsList = (props) => {
  const statusIndicator = (goal) => {
    if (goal.user_goal_concluded && !goal.user_goal_finalized) {
      if (goal.user_goal_success) {
        return (
          <button onClick={() => { props.incubatorActions.markGoalSuccess(goal.user_goal_id); }}>
            NEW GOAL COMPLETE
          </button>);
      }
      return (
        <button onClick={() => { props.incubatorActions.markGoalFailure(goal.user_goal_id); }}>
          NEW GOAL FAILURE
        </button>);
    }
    if (goal.user_goal_finalized) {
      if (goal.user_goal_success) {
        return <div> OLD GOAL SUCCESS </div>;
      }
      return <div> OLD GOAL FAILURE </div>;
    }
    if (goal.user_goal_end_date) {
      return (
   
          <Grid.Row columns={2}>
          <Grid.Column color="red">
            <Statistic
              floated="right"
              size="mini"
            >
              <Statistic.Value>
                {goal.user_goal_target - goal.user_goal_current} {goal.activity}
              </Statistic.Value>
              <Statistic.Label>
           to go!
              </Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column color="yellow">
          Deadline : {goal.user_goal_end_date}
          </Grid.Column>
          </Grid.Row>
   
      );
    }
    return (
      <div>
        {goal.user_goal_target - goal.user_goal_current} {goal.activity} to go!
      </div>
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
              <Grid.Row columns={1}>
                <Grid.Column color="green">
                  <Header as="h4">{goal.goal_name}</Header>
                </Grid.Column>
              </Grid.Row>
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
  state: PropTypes.shape({
    steps: PropTypes.number,
    distance: PropTypes.number,
    stairs: PropTypes.number,
  }).isRequired,
  // goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityType: PropTypes.string.isRequired,
  // iconKey: PropTypes.string.isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
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
