import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal, Input, Divider, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as goalsActions from '../actions/createGoalActions';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      goalID: this.props.goal.goal_id,
      goalName: this.props.goal.goal_name,
      // goalAmount: this.props.goal.goal_amount,
      goalDifficulty: this.props.goal.goal_difficulty,
      goalPoints: this.props.goal.goal_points,
      difficultyColor: null,
      deadline: { days: 0, hours: 0 },
      noDeadline: false,
      timeDivisor: this.props.goal.goal_timedivisor,
      errorMessage: '',
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.toggleNoDeadline = this.toggleNoDeadline.bind(this);
    this.submit = this.submit.bind(this);
    this.updateDeadlineHours = this.updateDeadlineHours.bind(this);
    this.updateDeadlineDays = this.updateDeadlineDays.bind(this);
    // this.difficult = this.difficult.bind(this);
  }
  componentDidMount() {
    this.colorDifficult(this.state.goalDifficulty);
  }

  colorDifficult(goalDifficulty) {
    if (goalDifficulty === 'easy') {
      this.setState({ difficultyColor: 'green' });
    } else if (goalDifficulty === 'med') {
      this.setState({ difficultyColor: 'yellow' });
    } else {
      this.setState({ difficultyColor: 'red' });
    }
  }
  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }

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
    console.log('toggle!');
    this.setState({ noDeadline: !this.state.noDeadline });
    console.log(this.state.noDeadline);
  }

  close() {
    this.setState({ open: false, errorMessage: '' });
  }

  submit() {
    const deadline = this.state.noDeadline ? null : this.state.deadline;
    if (deadline && deadline.hours === 0 && deadline.days === 0) {
      this.setState({ errorMessage: 'please mark no deadline or set a deadline!' });
    } else {
      this.setState({ open: false, errorMessage: '' });
      let points = parseInt(this.state.goalPoints, 10);
      if (deadline) {
        const hours = (deadline.days * 24) + deadline.hours;
        points += parseInt((points / (hours / this.state.timeDivisor)), 10);
      }
      this.props.goalsActions.submitUserGoal(this.state.goalID, deadline, points);
    }
  }

  render() {
    const { open, dimmer, size } = this.state;

    return (
      <div>
        <Segment
          compact
          clearing
          color={this.state.difficultyColor}
          // color="green"
          onClick={() => this.show('blurring', 'mini')}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">{this.state.goalName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  color="green"
                  floated="right"
                  size="mini"
                >
                  <Statistic.Value>{this.state.goalPoints}</Statistic.Value>
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
        >
          <Modal.Header>Select a Deadline</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <p>I want to complete this goal in:</p>
              <Grid centered>
                <Grid.Row centered columns={3}>
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
                  <Grid.Column width={2}>
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
  }
);

export default connect(null, mapDispatchToProps)(Goal);
