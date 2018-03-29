import React from 'react';
import { Header, Statistic, Grid, Button, Modal, Input, Progress, Divider } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

class GoalDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCurrent: '',
      errorMessage: '',
      activityPercentage: this.activityPercentage(),
      timePercentage: this.timePercentage(),
    };
    this.updateForm = this.updateForm.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
    this.updateNewCurrent = this.updateNewCurrent.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.onTrackMessage = this.onTrackMessage.bind(this);
  }

  onTrackMessage() {
    if (this.state.timePercentage + this.state.activityPercentage < 85) {
      return (
        <Header as="h3" color="red" float="right"> Pick up the pace! You are at risk of failing this goal! </Header>
      );
    }
    if (this.state.timePercentage + this.state.activityPercentage > 115) {
      return (
        <Header as="h3" color="green" float="right"> way to go! you are ahead of schedule! </Header>
      );
    }
    return (
      <Header as="h3" color="blue" float="right"> Keep up the good work! You are on pace! </Header>
    );
  }

  activityPercentage() {
    const { goal } = this.props;

    const progress = goal.user_goal_current - goal.user_goal_start_value;
    return Math.floor((progress * 100) / goal.goal_amount);
  }

  timePercentage() {
    const { goal } = this.props;

    if (goal.user_goal_end_date) {
      const now = moment();
      const start = moment(goal.user_goal_start_date);
      const end = moment(goal.user_goal_end_date);
      return 100 - Math.floor((100 * now.diff(start, 'seconds')) / end.diff(start, 'seconds'));
    }
    return 100;
  }

  updateButtons() {
    const { goal, close } = this.props;
    return (!goal.user_goal_concluded &&
        (goal.goal_difficulty === 'custom' || !this.props.state.user.fitbit_id)) ?
          <Modal.Actions>
            <Header as="h5">{this.state.errorMessage}</Header>
            <Button color="black" onClick={close}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, that's me"
              onClick={this.submitUpdate}
            />
          </Modal.Actions>
      : <div />;
  }

  updateNewCurrent(event) {
    this.setState({ newCurrent: event.target.value });
  }

  submitUpdate() {
    const { close, goal } = this.props;
    const validatePositiveNumber = (string) => {
      if (parseInt(string, 10) >= 0) {
        return true;
      }
      return false;
    };
    if (validatePositiveNumber(this.state.newCurrent)) {
      this.props.incubatorActions.submitProgress(goal.user_goal_id, this.state.newCurrent);
      close();
      this.setState({ errorMessage: '', newCurrent: '0' });
    } else {
      this.setState({ errorMessage: 'please enter a positive number!' });
    }
  }

  updateForm() {
    const { goal } = this.props;
    return (!goal.user_goal_concluded &&
      (goal.goal_difficulty === 'custom' || !this.props.state.user.fitbit_id)) ?
        <div>
          <Divider />
          <Header as="h3">How far have you come?</Header>
          <Input
            value={this.state.newCurrent}
            onChange={this.updateNewCurrent}
            style={{ width: 50 }}
            label={{ basic: true, content: goal.goal_activity }}
            labelPosition="right"
            type="text"
          />
          <Header as="h5">Enter progress since last check-in</Header>
        </div>
      : <div />;
  }

  render() {
    const {
      goal, size, dimmer, open, close,
    } = this.props;
    return (
      <Modal
        size={size}
        dimmer={dimmer}
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
                  Activity Progress
                  <Progress
                    style={{ marginTop: 8 }}
                    size="medium"
                    percent={this.state.activityPercentage}
                    progress
                    indicating
                  />
                  Time Remaining
                  <Progress
                    style={{ marginTop: 8 }}
                    size="medium"
                    percent={this.state.timePercentage}
                    progress
                    indicating
                  />
                  {this.onTrackMessage()}
                  {this.updateForm()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        {this.updateButtons()}
      </Modal>
    );
  }
}

GoalDetailModal.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  goal: PropTypes.shape({
    goal_id: PropTypes.number,
    user_goal_id: PropTypes.number,
    goal_name: PropTypes.string,
    goal_difficulty: PropTypes.string,
    goal_points: PropTypes.string,
    goal_timedivisor: PropTypes.number,
    goal_activity: PropTypes.string,
    user_goal_concluded: PropTypes.number, // really bool 0/1
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { incubatorActions: bindActionCreators(incubatorActions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetailModal);
