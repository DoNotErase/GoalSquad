import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';

const LandingPage = props => (
  <div>
    <p> hello {props.state.user.username} </p>

    <button onClick={props.actions.getLifetimeData}> getLifeTimeData </button>

    <p>Lifetime Steps: {props.state.activity.lifetimeSteps}</p>
    <p>Lifetime Floors: {props.state.activity.lifetimeFloors}</p>
    <p>Lifetime Distance: {props.state.activity.lifetimeDistance}</p>
  </div>
);

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
