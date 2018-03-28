import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Progress, Image, Header } from 'semantic-ui-react';

class BattleInterfaceBottom extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Header sub size="tiny" textAlign="right">ScuttleButt</Header>
              <Progress
                size="small"
                progress="ratio"
                color="orange"
                value="10"
                total="10"
              />
            </Grid.Row>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column />
                <Grid.Column textAlign="center" verticalAlign="bottom">
                  <Image
                    src="./assets/squaddies/scuttlebutt.png"
                    size="small"
                    spaced="right"
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
