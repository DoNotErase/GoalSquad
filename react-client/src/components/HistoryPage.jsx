import React from 'react';
import { Divider, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HistorySort from './HistorySort';
import HistoryList from './HistoryList';
import MainMenu from './MainMenu';

const HistoryPage = props => (
  <div className="historypage">
    <Header as="h1" className="white" textAlign="right">Past Goals</Header>
    <Divider hidden />
    <Grid centered>
      <Grid.Column computer={8} mobile={16}>
        <HistorySort />
      </Grid.Column>
      <Grid.Row
        columns={2}
        verticalAlign="top"
        style={{ position: 'fixed', bottom: 0, padding: 1 }}
      >
        <HistoryList />
      </Grid.Row>
    </Grid>
    <MainMenu history={props.history} />
  </div>
);

HistoryPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default HistoryPage;
