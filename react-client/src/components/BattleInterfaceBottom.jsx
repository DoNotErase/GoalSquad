import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Progress, Image, Button, Header, Confirm } from 'semantic-ui-react';

class BattleInterfaceBottom extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };

    this.show = this.show.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  show() { this.setState({ open: true }); }
  handleConfirm() { this.setState({ open: false }); }
  handleCancel() { this.setState({ open: false }); }

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Header sub size="tiny" textAlign="left">Squaggle</Header>
              <Progress
                size="small"
                progress="ratio"
                color="orange"
                value="5"
                total="10"
              />
            </Grid.Row>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    src="./assets/squaddies/squaggle.png"
                    size="small"
                    spaced="right"
                  />
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="bottom">
                  <Button basic fluid color="red" content="Attack" style={{ marginBottom: 2 }} />
                  <Button basic fluid color="blue" content="Defend" style={{ marginBottom: 2 }} />
                  <Button
                    basic
                    fluid
                    color="grey"
                    content="Surrender"
                    style={{ marginBottom: 2 }}
                    onClick={this.show}
                  />
                  <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    confirmButton="Surrender"
                    cancelButton="Stay"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default connect(null, null)(BattleInterfaceBottom);
