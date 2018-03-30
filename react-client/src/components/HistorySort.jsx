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
    return (
      <div>
        <Grid centered>
          <Header as="h3"> Sort By: </Header>
          <Grid.Column computer={8} mobile={16}>
            <Button>Start Date</Button>
            <Button>Success</Button>
            <Button>Length</Button>
            <Button>Goal Type</Button>
          </Grid.Column>
        </Grid>
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
