import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as createGoalActions from '../actions/createGoalActions';

const LandingPage = props => (
  <div>
    <p> hello {props.state.username} </p>

    <button onClick={props.actions.getLifetimeData}> getLifeTimeData </button>

    <p>Lifetime Steps: {props.state.lifetimeSteps}</p>
    <p>Lifetime Floors: {props.state.lifetimeFloors}</p>
    <p>Lifetime Distance: {props.state.lifetimeDistance}</p>

    <button onClick={() => props.goalActions.submitUserGoal(3, null, 75)}> Test create goal </button>
    <button onClick={() => props.goalActions.getDefaultGoals()}> Test fetch default goals </button>

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
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  goalActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    goalActions: bindActionCreators(createGoalActions, dispatch),
  });

const mapStateToProps = state => ({ state: state.main });

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
