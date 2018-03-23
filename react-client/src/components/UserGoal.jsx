import React from 'react';
import { Header, Statistic, Grid, Button, Modal, Input } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as incubatorActions from '../actions/incubatorActions';

class UserGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      newCurrent: '',
      errorMessage: '',
    };
    console.log(props.goal);

    this.makeDeadLineMessage = this.makeDeadLineMessage.bind(this);
    this.activityName = this.activityName.bind(this);
    this.goalStatus = this.goalStatus.bind(this);
    this.updateNewCurrent = this.updateNewCurrent.bind(this);
    this.close = this.close.bind(this);
    this.makeUpdateButton = this.makeUpdateButton.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  makeDeadLineMessage() {
    const { goal } = this.props;
    if (goal.user_goal_end_date && !goal.user_goal_concluded) {
      const now = moment();
      const deadline = moment(goal.user_goal_end_date).subtract(5, 'hours');
      const days = deadline.diff(now, 'days');
      if (days >= 1) {
        return `${(days + 1)} days left!`; // plus 1 because diff uses 'floor'
      }
      const hours = deadline.diff(now, 'hours');
      if (hours >= 1) {
        return `${(hours + 1)} hours left!`;
      }
      return `${deadline.diff(now, 'minutes') + 1} minutes left!`;
    }

    return '';
  }

  activityName() {
    switch (this.props.goal.goal_activity) {
      case 'distance':
        return 'Miles';
      case 'floors':
        return 'Flights';
      case 'steps':
        return 'Steps';
      default:
        return this.props.goal.goal_activity;
    }
  }

  goalStatus() {
    const { goal } = this.props;
    if (goal.user_goal_concluded) {
      if (goal.user_goal_success) {
        return (
          <Button
            onClick={() => {
              this.props.incubatorActions.markGoalSuccess(goal.user_goal_id);
            }}
          >
            Goal Success!
          </Button>
        );
      }
      return (
        <Button onClick={() => { this.props.incubatorActions.markGoalFailure(goal.user_goal_id); }}>
          Goal Failed :(
        </Button>);
    }

    return ( // goal has neither been completed nor expired
      <Statistic
        floated="right"
        size="mini"
      >
        <Statistic.Value>
          {goal.user_goal_target - goal.user_goal_current}
          <br />
          {this.activityName()}
        </Statistic.Value>
        <Statistic.Label>
          to go!
        </Statistic.Label>
      </Statistic>
    );
  }

  updateNewCurrent(event) {
    this.setState({ newCurrent: event.target.value });
  }

  close() {
    this.setState({ open: false });
  }

  makeUpdateButton() {
    if (this.props.goal.goal_difficulty === 'custom') {
      return (
        <Button onClick={(() => { this.setState({ open: true }); })}> Update Progress </Button>
      );
    }
    return (<div />);
  }

  submitUpdate() {
    const validatePositiveNumber = (string) => {
      if (parseInt(string, 10) >= 0) {
        return true;
      }
      return false;
    };
    if (validatePositiveNumber(this.state.newCurrent)) {
      this.props.incubatorActions.submitProgress(this.props.goal.user_goal_id, this.state.newCurrent);
      this.setState({ errorMessage: '', open: false, newCurrent: '0' });
    } else {
      this.setState({ errorMessage: 'please enter a positive number!' });
    }
  }

  render() {
    const { open, dimmer, size } = this.state;
    const { goal } = this.props;
    return (
      <div>
        <Grid.Row columns={2}>
          <Grid.Column >
            <Header as="h4">{goal.goal_name}</Header>
            {this.makeDeadLineMessage()} {/* generate time until expiration or '' if no deadline */}
            {this.makeUpdateButton()}
          </Grid.Column>
          <Grid.Column >
            {this.goalStatus()} {/* show amount of activity left or button to close out old goal */}
          </Grid.Column>
        </Grid.Row>

        {/* VIEW GOAL MODAL */}

        <Modal
          size={size}
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>{goal.goal_name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid relaxed>
                <Grid.Row>
                  <Grid.Column>
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Header as="h5">{this.state.errorMessage}</Header>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, that's me"
              onClick={this.submitUpdate}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { incubatorActions: bindActionCreators(incubatorActions, dispatch) }
);

export default connect(null, mapDispatchToProps)(UserGoal);
