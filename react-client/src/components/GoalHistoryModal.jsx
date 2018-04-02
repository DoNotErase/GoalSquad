import React from 'react';
import { Header, Grid, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as goalsActions from '../actions/createGoalActions';

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
      <Header as="h5">
        Completed: {completed} / {goal.goal_amount} {unit}
      </Header>
    );
  };

  const createRepeatGoal = () => {
    const deadline = {
      days: deadlineDays(),
      hours: deadlineHours(),
    };
    props.goalsActions.submitUserGoal(goal.goal_id, deadline, goal.user_goal_points);
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
  goalsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { goalsActions: bindActionCreators(goalsActions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalHistoryModal);
