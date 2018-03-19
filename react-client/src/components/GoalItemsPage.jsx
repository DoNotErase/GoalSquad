import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

const GoalItemsPage = (props) => {
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
        <div>
          <p> {goal.user_goal_target - goal.user_goal_current} {goal.activity} to go! </p>
          <p> Deadline : {goal.user_goal_end_date} </p>
        </div>);
    }
    return (
      <div>
        <p> {goal.user_goal_target - goal.user_goal_current} {goal.activity} to go! </p>
      </div>
    );
  };

  if (props.goals) {
    return (
      <div className="goal-items-page">
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.goal-items-page {
                height: 100%;
            }
        `}
        </style>
        <Grid
          container
          columns={3}
          className="goal-item"
        >
          <List>
            {props.goals.map(goal => (
              <List.Content key={goal.user_goal_id}>
                <Grid.Column width={3}>
                  <img className="activity-icon" src={props.iconKey} alt="person running" />
                </Grid.Column>
                <Grid.Column textAlign="left" width={10}>
                  <List.Header><strong>{goal.goal_name}</strong></List.Header>
                  <List.Description>
                    {goal.user_goal_end_date}
                    <br />
                    {statusIndicator(goal)}
                    {}
                  </List.Description>
                </Grid.Column>
                <Grid.Column width={3}>
                  <a href="#"><List.Icon name="chevron right" /></a> {/* goes to specific goal's detail page */}
                </Grid.Column>
              </List.Content>))
            }
          </List>
        </Grid>
      </div>
    );
  }
  return (
    <div />
  );
};

GoalItemsPage.propTypes = {
  state: PropTypes.shape({
    steps: PropTypes.number,
    distance: PropTypes.number,
    stairs: PropTypes.number,
  }).isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityType: PropTypes.string.isRequired,
  iconKey: PropTypes.string.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(GoalItemsPage);
