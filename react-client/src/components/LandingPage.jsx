import React from 'react';

import { Button } from 'semantic-ui-react'; // delete later
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as createGoalActions from '../actions/createGoalActions';
import * as incubatorActions from '../actions/incubatorActions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.getLifetimeData();
    this.props.incubatorActions.getUserGoals();
  }



  render() {
    let goalsList = this.props.goalsState.standardGoals;
    // const showGoalsName = Object.keys(this.props.goalsState.standardGoals).map((key) => {
    //   return (
    //     <div key={key}>{key}</div>
    //       return this.props.goalsState.standardGoals.map( (goal) => {
    //
    //     })
    //   );
    // });
    //
    // console.log('showGoalsName', showGoalsName);
    //
    // let complete = Object.keys(goalsList).map( (keyName) => (
    //   <ul key={keyName}>{keyName}
    //   goalsList[keyName].map( (singlGoal) => {}
    //
    //   </ul>
    // ));

    console.log('this.props', this.props);
    return (
      <div>
        <p> hello {this.props.state.username} </p>

        <button onClick={this.props.actions.getLifetimeData}> getLifeTimeData</button>

        <p>Lifetime Steps: {this.props.state.lifetimeSteps}</p>
        <p>Lifetime Floors: {this.props.state.lifetimeFloors}</p>
        <p>Lifetime Distance: {this.props.state.lifetimeDistance}</p>

        <button onClick={() => this.props.goalActions.submitUserGoal(3, null, 75)}>
          Test create goal
        </button>
        <br />
        <button
          onClick={() => this.props.goalActions.getDefaultGoals()}
        > Test fetch default goals
        </button>
        {/*<div>*/}
        {/*{Object.keys(goalsList).map((keyName, keyIndex) => {*/}
            {/*<div id={keyName}>{keyName}</div>*/}
          {/*{goalsList[keyName].map((singleGoal) => {*/}
            {/*<div id={singleGoal.goal_id}>{singleGoal.goal_name}</div>*/}
          {/*})}*/}
        {/*})}*/}
        {/*<div>*/}
        <br />
        <button
          onClick={() => this.props.incubatorActions.getUserGoals()}
        > Test fetch userGoals
        </button>
        <div>
          {this.props.incubatorState.userGoals.map(goal => (
            <div key={goal.goalID}> {goal.goal_name} </div>
          ))}
        </div>
        <Link to="/goals">
          <Button color="violet" fluid size="large" style={{ marginTop: 250 }}>goals page</Button>
        </Link>
      </div>
    );
  }
}

// LandingPage.propTypes = {
//   state: PropTypes.shape({
//     id: PropTypes.string,
//     username: PropTypes.string,
//     lifetimeSteps: PropTypes.number,
//     lifetimeFloors: PropTypes.number,
//     lifetimeDistance: PropTypes.number,
//   }).isRequired,
//   goalsState: PropTypes.objectOf(PropTypes.array).isRequired,
//   incubatorState: PropTypes.objectOf(PropTypes.array).isRequired,
//   actions: PropTypes.objectOf(PropTypes.func).isRequired,
//   goalActions: PropTypes.objectOf(PropTypes.func).isRequired,
//   incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
// };

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
