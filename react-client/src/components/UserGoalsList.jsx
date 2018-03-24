import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';
import UserGoal from './UserGoal';

const UserGoalsList = props => (
  <Segment.Group raised>
    {props.goals.map(goal => (
      <Segment
        key={goal.user_goal_id}
        compact
        clearing
      >
        <UserGoal goal={goal} />
      </Segment>
    ))}
  </Segment.Group>
);

UserGoalsList.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  // incubatorActions: PropTypes.shape({
  //   markGoalSuccess: PropTypes.func,
  //   markGoalFailure: PropTypes.func,
  // }).isRequired,
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
