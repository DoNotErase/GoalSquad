import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as actions from '../actions/actions';

const LandingPage = (props) => {
  console.log(props);
  return (
    <div>
      <p> hello world </p>
      <a href="/auth/fitbit"><button> Connect to Fitbit </button></a>

      <button onClick={props.actions.getLifetimeData}> getLifeTimeData </button>
      <p>Lifetime Steps: {props.state.main.lifetimeSteps}</p>
      <p>Lifetime Floors: {props.state.main.lifetimeFloors}</p>
      <p>Lifetime Distance: {props.state.main.lifetimeDistance}</p>
    </div>
  );
};

const mapDispatchToProps = dispatch => // this grabs the dispatch method from store
  ({ actions: bindActionCreators(actions, dispatch) }); // this attaches dispatch to an action (like login)


const mapStateToProps = state => ({ state });


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
