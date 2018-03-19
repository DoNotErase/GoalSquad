import React from 'react';
import { Divider, Grid, Header, Item, List, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

const GoalItemsPage = (props) => {
  const completeGoal = (goal) => {
    props.incubatorActions.markGoalComplete(goal.user_goal_id);
  };

  const statusIndicator = (goal) => {
    if (goal.user_goal_success === 1) {
      return (<div> You completed this goal! </div>);
    }
    // if (goal.user_goal_success === 0) {
    //   return <div> You failed this goal :( </div>;
    // }
    // put in cases for time elapsed and failed button to close goal
    if (goal.user_goal_start_value - props.state[props.activityType] > 0) {
      return <div> {goal.user_goal_start_value - props.state[props.activityType]} </div>;
    }
    if (goal.user_goal_start_value - props.state[props.activityType] < 0) {
      return (
        <button onClick={() => completeGoal(goal)}>
          Success!
        </button>);
    }
    return (<div />);
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
