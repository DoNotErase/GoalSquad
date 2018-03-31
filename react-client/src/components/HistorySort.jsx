import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as historyActions from '../actions/historyActions';

class HistorySort extends React.Component {
  componentDidMount() {
    console.log('please stop being angry linter');
  }

  render() {
    const actions = this.props.historyActions;
    return (
      <div>
        <Header as="h5" style={{ marginBottom: '2px' }}> Sort By: </Header>
        <Grid.Row>
          <Button.Group style={{ marginBottom: '2px' }}>
            <Button onClick={() => actions.sort('date')} compact>Start Date</Button>
            <Button.Or />
            <Button onClick={() => actions.sort('points')} compact>Points</Button>
            <Button.Or />
            <Button onClick={() => actions.sort('activity')} compact>Activity</Button>
          </Button.Group>
        </Grid.Row>

        <Header as="h5" style={{ marginBottom: '2px', marginTop: '4px' }}> Filter: </Header>
        <Grid.Row>
          <Button.Group style={{ marginBottom: '2px' }}>
            <Button onClick={() => actions.filter('all')} compact>All</Button>
            <Button.Or />
            <Button onClick={() => actions.filter('success')} compact>Successful</Button>
            <Button.Or />
            <Button onClick={() => actions.filter('fail')} compact>Failed</Button>
          </Button.Group>
        </Grid.Row>
      </div>
    );
  }
}

HistorySort.propTypes = {
  historyActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({
  historyState: state.history,
});

const mapDispatchToActions = dispatch => ({
  historyActions: bindActionCreators(historyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToActions)(HistorySort);
