import React from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as historyActions from '../actions/historyActions';

class HistoryGoal extends React.Component {
  render() {
    const { goal } = this.props;
    return (
      <Segment
        compact
        clearing
        color="blue"
      >
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h4">{goal.goal_name}</Header>
            </Grid.Column>
            <Grid.Column>
              <Statistic
                color="blue"
                floated="right"
                size="mini"
              >
                <Statistic.Value>{goal.user_goal_points}</Statistic.Value>
                <Statistic.Label>points</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

HistoryGoal.propTypes = {
  historyActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({
  historyState: state.history,
});

const mapDispatchToActions = dispatch => ({
  historyActions: bindActionCreators(historyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToActions)(HistoryGoal);
