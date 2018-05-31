import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as histActions from './historyActions';

const HistorySort = (props) => {
  const { historyActions } = props;

  const src = './assets/icons/';

  return (
    <div>
      <Header as="h5" style={{ marginBottom: '.5vh', color: 'white' }}> Sort By: </Header>
      <Grid.Row>
        <div>
          <Button.Group style={{ marginBottom: '.5vh', align: 'top' }}>
            <Button onClick={() => historyActions.sort('date')} compact>Start Date</Button>
            <Button.Or />
            <Button onClick={() => historyActions.sort('points')} compact>Points</Button>
            <Button.Or />
            <Button onClick={() => historyActions.sort('activity')} compact>Activity</Button>
            {`${src}reverse.png`}
            <Button onClick={historyActions.flipSort} style={{ marginLeft: '.5vh' }} compact>
              <img
                src={`${src}reverse.png`}
                alt=""
                style={{
                  height: '4vh',
                  width: '4vh',
                }}
              />
            </Button>
          </Button.Group>
        </div>
      </Grid.Row>

      <Header as="h5" style={{ marginBottom: '.5vh', marginTop: '.5vh', color: 'white' }}> Filter: </Header>
      <Grid.Row>
        <Button.Group style={{ marginBottom: '.5vh' }}>
          <Button onClick={() => historyActions.filter('all')} compact>All</Button>
          <Button.Or />
          <Button onClick={() => historyActions.filter('success')} compact>Successful</Button>
          <Button.Or />
          <Button onClick={() => historyActions.filter('fail')} compact>Failed</Button>
        </Button.Group>
      </Grid.Row>
    </div>
  );
};

HistorySort.propTypes = {
  historyActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToActions = dispatch => ({
  historyActions: bindActionCreators(histActions, dispatch),
});

export default connect(null, mapDispatchToActions)(HistorySort);
