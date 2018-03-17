import React from 'react';
import { Segment, Header, Statistic, Grid } from 'semantic-ui-react';

const Goal = () => (
  <Segment compact color="green" clearing>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header as="h3">goal_name</Header>
        </Grid.Column>
        <Grid.Column>
          <Statistic color="green" floated="right" size="small">
            <Statistic.Value>50</Statistic.Value>
            <Statistic.Label>points</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default Goal;
