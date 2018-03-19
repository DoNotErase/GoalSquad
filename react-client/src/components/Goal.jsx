import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal, Input, Divider, Checkbox } from 'semantic-ui-react';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props', this.props);
    this.state = {
      open: false,
      goalID: this.props.goal.goal_id,
      goalName: this.props.goal.goal_name,
      goalAmount: this.props.goal.goal_amount,
      goalDifficulty: this.props.goal.goal_difficulty,
      goalPoints: this.props.goal.goal_points,
      difficultyColor: null,
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
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
  close() { this.setState({ open: false }); }

  render() {
    const {
      open, dimmer, size, difficultyColor, goalName, goalPoints,
    } = this.state;

    return (
      <div>
        <Segment
          compact
          clearing
          color={difficultyColor}
          onClick={() => this.show('blurring', 'mini')}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">{goalName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  color={difficultyColor}
                  floated="right"
                  size="mini"
                >
                  <Statistic.Value>{goalPoints}</Statistic.Value>
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
                      style={{ width: 50 }}
                      label={{ basic: true, content: 'day(s)' }}
                      labelPosition="right"
                      type="number"
                    />
                  </Grid.Column>
                  <Grid.Column width={2}>
                  and
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      style={{ width: 50 }}
                      label={{ basic: true, content: 'hour(s)' }}
                      labelPosition="right"
                      type="number"
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
                    <Checkbox label="I don't want a deadline." />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
                    Nope
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, that's me"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Goal;
