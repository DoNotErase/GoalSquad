import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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
};

export default UserGoalsList;
