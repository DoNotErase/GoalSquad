import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal, Input, Divider, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { submitUserGoal } from './createGoalActions';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      difficultyColor: null,
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
  }

  componentDidMount() {
    this.colorDifficult(this.props.goal.goal_difficulty);
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
    this.setState({ noDeadline: !this.state.noDeadline });
  }

  close() {
    this.setState({ open: false, errorMessage: '' });
  }

  submit() {
    if (this.state.noDeadline) {
      const points = parseInt(this.props.goal.goal_points, 10);
      this.setState({ open: false, errorMessage: '', noDeadline: false });
      this.props.submitUserGoal(this.props.goal.goal_id, null, points);
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
    if (!((parseInt(deadline.hours, 10) >= 0) && (parseInt(deadline.days, 10) >= 0))) {
      this.setState({ errorMessage: 'please put only positive numbers as a deadline!' });
    } else if (!deadline.hours && !deadline.days) {
      this.setState({ errorMessage: 'please mark no deadline or set a deadline!' });
    } else {
      this.setState({ open: false, errorMessage: '', noDeadline: false });
      let points = parseInt(this.props.goal.goal_points, 10);
      const hours = (deadline.days * 24) + deadline.hours;
      points += parseInt((points / (hours / this.props.goal.goal_timedivisor)), 10);
      points = points > 100 ? (parseInt(this.props.goal.goal_points, 10) * 2) : points;
      this.props.submitUserGoal(this.props.goal.goal_id, deadline, points);
      this.props.history.push('/incubator');
    }
  }

  render() {
    const {
      open, dimmer, size, difficultyColor,
    } = this.state;

    return (
      <div>
        <Segment
          compact
          clearing
          color={difficultyColor}
          onClick={() => this.show(true, 'mini')}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">{this.props.goal.goal_name}</Header>
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  color={difficultyColor}
                  floated="right"
                  size="mini"
                >
                  <Statistic.Value>{this.props.goal.goal_points}</Statistic.Value>
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
          <Modal.Header>Select a Deadline</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>I want to complete this goal in:</p>
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
            <Button color="grey" onClick={this.close}>
                    Cancel
            </Button>
            <Button
              color="orange"
              icon="checkmark"
              labelPosition="right"
              content="Submit Goal"
              onClick={this.submit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

Goal.propTypes = {
  goal: PropTypes.shape({
    goal_id: PropTypes.number,
    goal_name: PropTypes.string,
    goal_difficulty: PropTypes.string,
    goal_points: PropTypes.string,
    goal_timedivisor: PropTypes.number,
  }).isRequired,
  submitUserGoal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    submitUserGoal: bindActionCreators(submitUserGoal, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(Goal);
