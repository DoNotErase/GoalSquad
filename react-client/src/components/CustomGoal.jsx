import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal, Input, Divider, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as goalsActions from '../actions/createGoalActions';
import * as incubatorActions from '../actions/incubatorActions';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activity: '',
      amount: '',
      units: '',
      deadline: { days: 0, hours: 0 },
      noDeadline: false,
      errorMessage: '',
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.toggleNoDeadline = this.toggleNoDeadline.bind(this);
    this.submit = this.submit.bind(this);
    this.updateDeadlineHours = this.updateDeadlineHours.bind(this);
    this.updateDeadlineDays = this.updateDeadlineDays.bind(this);
    this.updateGoalActivity = this.updateGoalActivity.bind(this);
    this.updateGoalAmount = this.updateGoalAmount.bind(this);
    this.updateGoalUnits = this.updateGoalUnits.bind(this);
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }

  updateGoalActivity(event) {
    this.setState({
      activity: event.target.value,
    });
  }

  updateGoalAmount(event) {
    this.setState({
      amount: event.target.value,
    });
  }

  updateGoalUnits(event) {
    this.setState({
      units: event.target.value,
    });
  }
  updateDeadlineHours(event) {
    this.setState({
      deadline: {
        hours: event.target.value,
        days: this.state.deadline.days,
      },
    });
  }

  updateDeadlineDays(event) {
    this.setState({
      deadline: {
        hours: this.state.deadline.hours,
        days: event.target.value,
      },
    });
  }

  toggleNoDeadline() {
    this.setState({ noDeadline: !this.state.noDeadline });
  }

  close() {
    this.setState({ open: false, errorMessage: '' });
  }

  submit() {
    const validateString = (string) => {
      if (typeof string === 'string' && string.length > 2) {
        return true;
      }
      return false;
    };

    const validatePositiveNumber = (string) => {
      if (parseInt(string, 10) >= 0) {
        return true;
      }
      return false;
    };

    if (!(validateString(this.state.activity) && validateString(this.state.units))) {
      this.setState({ errorMessage: 'please enter an activity and units!' });
      return;
    }

    const activity = `${this.state.activity[0].toUpperCase()}${this.state.activity.slice(1)}`;
    console.log(activity);
    const goalName = `${activity} ${this.state.amount} ${this.state.units}`;

    if (this.state.noDeadline) {
      this.setState({ open: false, errorMessage: '', noDeadline: false });
      this.props.goalsActions.submitCustomGoal(goalName, this.state.units, this.state.amount, null, 20);
      this.props.history.push('/incubator');
      return;
    }

    const { deadline } = this.state;

    if (deadline.hours === '0' || deadline.hours === '' || deadline.hours === ' ') {
      deadline.hours = 0;
    }
    if (deadline.days === '0' || deadline.days === '' || deadline.days === ' ') {
      deadline.days = 0;
    }

    if (!(validatePositiveNumber(deadline.hours) && validatePositiveNumber(deadline.days))) {
      this.setState({ errorMessage: 'please put only positive numbers as a deadline!' });
    } else if (!deadline.hours && !deadline.days) {
      this.setState({ errorMessage: 'please mark no deadline or set a deadline!' });
    } else {
      this.setState({ open: false, errorMessage: '', noDeadline: false });
      let points = 20;
      const hours = (deadline.days * 24) + deadline.hours;
      points += parseInt((points / (hours / 5)), 10);
      this.props.goalsActions.submitCustomGoal(goalName, this.state.units, this.state.amount, deadline, points);
      this.props.history.push('/incubator');
    }
  }

  render() {
    const {
      open, dimmer, size,
    } = this.state;

    return (
      <div>
        <Segment
          compact
          clearing
          color="blue"
          onClick={() => this.show(true, 'mini')}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">CustomGoal</Header>
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  color="blue"
                  floated="right"
                  size="mini"
                >
                  <Statistic.Value>20</Statistic.Value>
                  <Statistic.Label>points</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {/* ADD GOAL MODAL */}

        <Modal
          size={size}
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          className="fadeIn"
        >
          <Modal.Header>Create a Goal</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <p>I want to </p>
              <Grid.Row columns={1}>
                <Input
                  placeholder="read"
                  value={this.state.activity}
                  onChange={this.updateGoalActivity}
                  style={{ width: 200, marginBottom: '5px' }}
                  label={{ basic: true, content: 'activity' }}
                  labelPosition="right"
                  type="text"
                />
                <Input
                  placeholder="20"
                  value={this.state.amount}
                  onChange={this.updateGoalAmount}
                  style={{ width: 200, marginBottom: '5px' }}
                  label={{ basic: true, content: 'amount' }}
                  labelPosition="right"
                  type="text"
                />
                <Input
                  placeholder="pages"
                  value={this.state.units}
                  onChange={this.updateGoalUnits}
                  style={{ width: 200, marginBottom: '10px' }}
                  label={{ basic: true, content: 'units' }}
                  labelPosition="right"
                  type="text"
                />
              </Grid.Row>
              <p>within</p>
              <Grid relaxed>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Input
                      value={this.state.deadline.days}
                      onChange={this.updateDeadlineDays}
                      style={{ width: 50 }}
                      label={{ basic: true, content: 'day(s)' }}
                      labelPosition="right"
                      type="text"
                    />
                  </Grid.Column>
                  <Grid.Column width={1} verticalAlign="middle">
                    and
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      value={this.state.deadline.hours}
                      onChange={this.updateDeadlineHours}
                      style={{ width: 50 }}
                      label={{ basic: true, content: 'hour(s)' }}
                      labelPosition="right"
                      type="text"
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={1}>
                  <Grid.Column>
                    <Divider
                      as="h4"
                      className="header"
                      horizontal
                      style={{ textTransform: 'uppercase' }}
                    >
                      OR
                    </Divider>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={1}>
                  <Grid.Column>
                    <Checkbox onChange={this.toggleNoDeadline} label="I don't want a deadline." />
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
  {
    goalsActions: bindActionCreators(goalsActions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(Goal);
