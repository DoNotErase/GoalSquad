import React from 'react';
import { Segment, Header, Statistic, Grid, Button, Modal } from 'semantic-ui-react';

class Goal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }


  render() {
    const { open, dimmer, size } = this.state;
    return (
      <div>
        <Segment
          compact
          clearing
          color="green"
          onClick={() => this.show('blurring', 'mini')}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h4">goal_name</Header>
              </Grid.Column>
              <Grid.Column>
                <Statistic
                  color="green"
                  floated="right"
                  size="mini"
                >
                  <Statistic.Value>50</Statistic.Value>
                  <Statistic.Label>points</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Modal
          size={size}
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Select a Deadline</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <Header>Something</Header>
              <p>Something something hello this is something</p>
              <p>Something else butts weiner lol.</p>
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
