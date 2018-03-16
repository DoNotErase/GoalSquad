import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/homePageActions';

const HomePage = () => (
  <div className="homepage">
    <style>{`
        body > div,
        body > div > div,
        body > div > div > div.homepage {
            height: 100%;
        }
    `}
    </style>
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{ height: '100%' }}
    >
      <Grid.Column width={10} style={{ maxWidth: 450 }}>
        <Header as="h1" textAlign="center" className="white" content="GOAL" />
        <Header as="h1" textAlign="center" className="white" content="SQUAD" />
        <a href="/auth/fitbit">
          <Button color="violet" fluid size="large" style={{ marginTop: 250 }}>Connect</Button>
        </a>
        <a href="/egg">
          <Button color="violet" fluid size="large" style={{ marginTop: 250 }}>Egg</Button>
        </a>
      </Grid.Column>
    </Grid>
  </div>
);

export default HomePage;