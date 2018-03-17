import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as createGoalActions from '../actions/createGoalActions';
import * as incubatorActions from '../actions/incubatorActions';

const LandingPage = props => (
  <div>
    <p> hello {props.state.username} </p>

    <button onClick={props.actions.getLifetimeData}> getLifeTimeData </button>

    <p>Lifetime Steps: {props.state.lifetimeSteps}</p>
    <p>Lifetime Floors: {props.state.lifetimeFloors}</p>
    <p>Lifetime Distance: {props.state.lifetimeDistance}</p>

    <button onClick={() => props.goalActions.submitUserGoal(3, null, 75)}>
      Test create goal
    </button>
    <br />
    <button onClick={() => props.goalActions.getDefaultGoals()}> Test fetch default goals </button>
    <div>
      {props.goalsState.standardGoals.map(goal => (<div> {goal.goal_name} </div>))}
    </div>
    <br />
    <button onClick={() => props.incubatorActions.getUserGoals()}> Test fetch userGoals </button>
    <div>
      {props.incubatorState.userGoals.map(goal => (<div> {goal.goal_name} </div>))}
    </div>

  </div>
);

LandingPage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    lifetimeSteps: PropTypes.number,
    lifetimeFloors: PropTypes.number,
    lifetimeDistance: PropTypes.number,
  }).isRequired,
  goalsState: PropTypes.objectOf(PropTypes.array).isRequired,
  incubatorState: PropTypes.objectOf(PropTypes.array).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  goalActions: PropTypes.objectOf(PropTypes.func).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    goalActions: bindActionCreators(createGoalActions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    goalsState: state.goals,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
