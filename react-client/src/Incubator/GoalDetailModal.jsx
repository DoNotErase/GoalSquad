import React from 'react';
import { Header, Grid, Button, Modal, Input, Progress } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from './incubatorActions';

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
    this.timeProgress = this.timeProgress.bind(this);
    this.estimateCompletion = this.estimateCompletion.bind(this);
  }

  onTrackMessage() {
    const humanize = (minutes) => {
      const positive = Math.abs(minutes);
      if (positive / 60 < 1) {
        return `${positive} minutes`;
      }
      if ((positive / 60) / 24 < 1) {
        return `${Math.ceil(positive / 60)} hours`;
      }
      return `${Math.ceil((positive / 60) / 24)} days`;
    };

    const completeTime = this.estimateCompletion();

    if (this.props.goal.user_goal_end_date) {
      const difference = completeTime.diff(this.props.goal.user_goal_end_date, 'minutes');
      if (this.state.timePercentage + this.state.activityPercentage < 90) {
        return (
          <div>
            <Header as="h3" color="red" textAlign="right" floated="right"> Pick up the pace! You are at risk of failing this goal by {humanize(difference)}!</Header>
          </div>
        );
      }
      if (this.state.timePercentage + this.state.activityPercentage > 110) {
        return (
          <div>
            <Header as="h3" color="green" textAlign="right" floated="right">Way to go!  You are ahead of schedule by {humanize(difference)}!</Header>
          </div>
        );
      }
      return (
        <div>
          <Header as="h3" color="blue" textAlign="right" floated="right"> Keep up the good work! You are on pace!</Header>
        </div>
      );
    }
    const difference = moment().add(5, 'hours').diff(completeTime, 'minutes');
    return (
      <div>
        <Header as="h3" color="blue" textAlign="right" floated="right"> Keep up this pace and you will finish in {humanize(difference)}!</Header>
      </div>
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
      const now = moment().add(5, 'hours');
      const start = moment(goal.user_goal_start_date);
      const end = moment(goal.user_goal_end_date);
      return 100 - Math.floor((100 * now.diff(start, 'minutes')) / end.diff(start, 'minutes'));
    }
    return 100;
  }

  updateButtons() {
    const { goal, close } = this.props;
    return (!goal.user_goal_concluded &&
        (goal.goal_difficulty === 'custom' || !this.props.state.user.fitbit_id)) ?
          <Modal.Actions>
            <Header as="h5">{this.state.errorMessage}</Header>
            <Button color="grey" onClick={close}>
              Cancel
            </Button>
            <Button
              color="orange"
              icon="checkmark"
              labelPosition="right"
              content="Update Progress"
              onClick={this.submitUpdate}
            />
          </Modal.Actions>
      :
          <Modal.Actions>
            <Button color="grey" onClick={close}>
              Close
            </Button>
          </Modal.Actions>;
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
          <Header as="h3">How far have you come?</Header>
          <Input
            value={this.state.newCurrent}
            onChange={this.updateNewCurrent}
            style={{ width: 100 }}
            label={{ basic: true, content: goal.goal_activity }}
            labelPosition="right"
            type="text"
          />
          <Header as="h5">Enter progress since last check-in</Header>
        </div>
      : <div />;
  }

  timeProgress() {
    if (this.props.goal.user_goal_end_date) {
      return (
        <div>
          <Header as="h5"> Time Remaining </Header>
          <Progress
            style={{ marginTop: 8 }}
            size="medium"
            percent={this.state.timePercentage}
            progress
            indicating
          />
        </div>
      );
    }
    return (
      <Header as="h5"> Start date: {moment(this.props.goal.user_goal_start_date).add(-5, 'hours').format('LLLL')} </Header>
    );
  }

  estimateCompletion() {
    const { goal } = this.props;
    const timePercentNeeded = (100 / this.state.activityPercentage) *
      (100 - this.state.timePercentage);
    const timeAllotted = moment(goal.user_goal_end_date).diff(moment(goal.user_goal_start_date), 'minutes');
    const estimatedTimeNeeded = timeAllotted * (timePercentNeeded / 100);
    return moment(goal.user_goal_start_date).add(estimatedTimeNeeded, 'minutes');
  }

  render() {
    const {
      goal, open, close,
    } = this.props;
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
                  <Header as="h5"> Activity Progress </Header>
                  <Progress
                    style={{ marginTop: 8 }}
                    size="medium"
                    percent={this.state.activityPercentage}
                    progress
                    indicating
                  />
                  {this.timeProgress()}
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
    user_goal_end_date: PropTypes.string,
    user_goal_start_date: PropTypes.string,
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
  close: PropTypes.func.isRequired,
  // dimmer: PropTypes.bool.isRequired,
  // size: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { incubatorActions: bindActionCreators(incubatorActions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetailModal);
