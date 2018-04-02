import React from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// import * as historyActions from './historyActions';
import GoalHistoryModal from './GoalHistoryModal';

class HistoryGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { goal } = this.props;
    return (
      <Segment
        compact
        clearing
        color={goal.user_goal_success ? 'green' : 'red'}
        onClick={() => this.setState({ open: true })}
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
        <GoalHistoryModal
          open={this.state.open}
          close={this.close}
          goal={goal}
          history={this.props.history}
        />
      </Segment>
    );
  }
}

HistoryGoal.propTypes = {
  goal: PropTypes.shape({
    user_goal_points: PropTypes.number,
    goal_name: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  historyState: state.history,
});

// const mapDispatchToActions = dispatch => ({
//   historyActions: bindActionCreators(historyActions, dispatch),
// });

export default connect(mapStateToProps, null)(HistoryGoal);
