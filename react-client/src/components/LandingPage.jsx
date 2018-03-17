import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as actions from '../actions/actions';

const LandingPage = (props) => {
  const submitUserGoal = (goalID, deadline, points) => {
    axios.post('/createUserGoal', {
      goalID,
      goalLength: deadline, // of form {day: (num), hour: ()} or null
      points,
    })
      .then(() => {
        console.log('goal created');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p> hello {props.state.user.username} </p>

      <button onClick={props.actions.getLifetimeData}> getLifeTimeData </button>

      <p>Lifetime Steps: {props.state.activity.lifetimeSteps}</p>
      <p>Lifetime Floors: {props.state.activity.lifetimeFloors}</p>
      <p>Lifetime Distance: {props.state.activity.lifetimeDistance}</p>

      <button onClick={() => submitUserGoal(3, null, 75)}> Test create goal </button>
    </div>
  );
};

LandingPage.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
    activity: PropTypes.shape({
      lifetimeSteps: PropTypes.number,
      lifetimeFloors: PropTypes.number,
      lifetimeDistance: PropTypes.number,
    }),
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

const mapStateToProps = state => ({ state: state.main });

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
