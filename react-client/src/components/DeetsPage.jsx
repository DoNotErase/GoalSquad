import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Statistic, Segment } from 'semantic-ui-react';
import MainMenu from './MainMenu';

const DeetsPage = () => (

  <div className="deetspage">
    <Header as="h1" className="white" textAlign="right">Deets</Header>
    <Divider hidden />
    <Grid centered>
      <Grid.Column computer={8} mobile={16}>
        <Segment.Group raised>
          <Segment compact>
            <Grid centered>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Statistic.Group size="tiny">
                    <Statistic color="green">
                      <Statistic.Value>90%</Statistic.Value>
                      <Statistic.Label>OF GOALS</Statistic.Label>
                      <Statistic.Value>COMPLETE</Statistic.Value>
                    </Statistic>
                    <Statistic color="red">
                      <Statistic.Value>10%</Statistic.Value>
                      <Statistic.Label>OF GOALS</Statistic.Label>
                      <Statistic.Value>FAILED</Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment attached="bottom" compact>
            <Grid centered>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Statistic.Group size="mini">
                    <Statistic horizontal>
                      <Statistic.Value>10%</Statistic.Value>
                      <Statistic.Label>Global<br />Average</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal>
                      <Statistic.Value>30%</Statistic.Value>
                      <Statistic.Label>Global<br />Average</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment.Group>
        <Segment.Group raised>
            <Segment><Statistic horizontal size="tiny" label="Total Stairs" value="2,204" /></Segment>
            <Segment><Statistic horizontal size="tiny" label="Total Steps" value="100,412" /></Segment>
            <Segment><Statistic horizontal size="tiny" label="Total Miles" value="157" /></Segment>
        </Segment.Group>
      </Grid.Column>
      <MainMenu />
    </Grid>
  </div>
);


const mapStateToProps = state => (
  {
    state: state.main,
    goalsState: state.goals,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps)(DeetsPage);
