import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal, Input, Divider, Checkbox } from 'semantic-ui-react';
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
    };
    console.log(props.goal);

    this.makeDeadLineMessage = this.makeDeadLineMessage.bind(this);
    this.activityName = this.activityName.bind(this);
    this.goalStatus = this.goalStatus.bind(this);
    this.updateNewCurrent = this.updateNewCurrent.bind(this);
    this.close = this.close.bind(this);
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
          <Button onClick={() => { this.props.incubatorActions.markGoalSuccess(goal.user_goal_id); }}>
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

  render() {
    const { open, dimmer, size } = this.state;
    const { goal } = this.props;
    return (
      <div>
        <Grid.Row columns={2} onClick={() => { this.setState({ open: true }); }} >
          <Grid.Column >
            <Header as="h4">{goal.goal_name}</Header>
            {this.makeDeadLineMessage()} {/* generate time until expiration or '' if no deadline */}
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
          <Modal.Header>Select a Deadline</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <Grid relaxed>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Input
                      value={this.state.newCurrent}
                      onChange={this.updateNewCurrent}
                      style={{ width: 50 }}
                      label={{ basic: true, content: 'hour(s)' }}
                      labelPosition="right"
                      type="text"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.state.errorMessage}
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, that's me"
              onClick={this.submit}
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
