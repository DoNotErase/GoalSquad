import React from 'react';
import { Header, Grid, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { submitUserGoal } from '../CreateGoal/createGoalActions';

const GoalHistoryModal = (props) => {
  const { goal, open, close } = props;
  const unit = goal.goal_name.split(' ').pop();

  const deadlineHours = () => (
    moment(goal.user_goal_end_date)
      .diff(moment(goal.user_goal_start_date), 'hours') % 24
  );

  const deadlineDays = () => (
    Math.floor(moment(goal.user_goal_end_date)
      .diff(moment(goal.user_goal_start_date), 'hours') / 24)
  );

  const getDeadlineMessage = () => {
    if (!goal.user_goal_end_date) {
      return 'no deadline!';
    }
    const days = deadlineDays();
    const hours = deadlineHours();
    if (!days) {
      return `${hours} hours`;
    }
    if (!hours) {
      return `${days} days`;
    }
    return `${days} days and ${hours} hours`;
  };

  const failureMessage = () => {
    if (goal.user_goal_success) {
      return (<div />);
    }
    const completed = `${goal.user_goal_current - goal.user_goal_start_value}`;
    return (
      <Header as="h5" floated="right" style={{ marginLeft: '20px' }}>
        Completed: {completed} / {goal.goal_amount} {unit}
      </Header>
    );
  };

  const canRepeat = () => {
    if (goal.goal_difficulty === 'custom') {
      if (moment().diff(moment(props.user.custom_goal_timer_1), 'days') < 1) {
        return true;
      }
    } else if (!props.userGoals[goal.goal_activity] ||
        props.userGoals[goal.goal_activity].length >= 2) {
      return true;
    }
    return false;
  };

  const createRepeatGoal = () => {
    const deadline = {
      days: deadlineDays(),
      hours: deadlineHours(),
    };
    props.submitRepeatGoal(goal.goal_id, deadline, goal.user_goal_points);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      className="fadeIn"
    >
      <Modal.Header>{goal.goal_name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid relaxed>
            <Grid.Row>
              <Grid.Column>
                <p>Started: {moment(goal.user_goal_start_date).format('LLLL')}</p>
                <p>Deadline Length: {getDeadlineMessage()}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {failureMessage()}
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={close}>
          Close
        </Button>
        <Button
          positive
          disabled={canRepeat()}
          icon="checkmark"
          labelPosition="right"
          content="Do it again!"
          onClick={createRepeatGoal}
        />
      </Modal.Actions>
    </Modal>
  );
};

GoalHistoryModal.propTypes = {
  goal: PropTypes.shape({
    goal_id: PropTypes.number,
    user_goal_id: PropTypes.number,
    goal_name: PropTypes.string,
    goal_difficulty: PropTypes.string,
    goal_points: PropTypes.string,
    goal_timedivisor: PropTypes.number,
    goal_activity: PropTypes.string,
    user_goal_concluded: PropTypes.number, // really bool 0/1
    user_goal_end_date: PropTypes.string,
    user_goal_start_date: PropTypes.string,
  }).isRequired,
  submitRepeatGoal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    custom_goal_timer_1: PropTypes.string,
  }).isRequired,
  userGoals: PropTypes.objectOf(PropTypes.array).isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    user: state.main.user,
    userGoals: state.incubator.userGoals,
  }
);

const mapDispatchToProps = dispatch => (
  { submitRepeatGoal: bindActionCreators(submitUserGoal, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalHistoryModal);
