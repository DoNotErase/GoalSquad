import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';

const HomePage = props => (
  <div>
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column color="red" />
        <Grid.Column width={8} color="blue">
          <Header as="h1" size="huge" textAlign="center">GOAL</Header>
          <Header as="h1" size="huge" textAlign="center">SQUAD</Header>
        </Grid.Column>
        <Grid.Column color="red" />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column />
        <Grid.Column>
          <a href="/auth/fitbit">
            <Button>Connect</Button>
          </a>
        </Grid.Column>
        <Grid.Column />
      </Grid.Row>
    </Grid>
  </div>
);

export default HomePage;
