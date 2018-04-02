import React from 'react';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import HistorySort from './HistorySort';
import HistoryGoal from './HistoryGoal';
import MainMenu from './MainMenu';
import { fetch } from '../actions/historyActions';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.fetchGoals();
  }

  render() {
    return (
      <div className="historypage">
        <Header as="h1" className="white" textAlign="right">Past Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Grid.Row>
              <HistorySort />
            </Grid.Row>
            <Grid.Row>
              <Scrollbars autoHide style={{ height: '75vh' }}>
                <Segment.Group raised>
                  {this.props.historyState.sortedGoals.map(goal => (
                    <HistoryGoal
                      key={goal.user_goal_id}
                      goal={goal}
                      history={this.props.history}
                    />
                  ))}
                </Segment.Group>
              </Scrollbars>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

HistoryPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  historyState: PropTypes.shape({
    sortedGoals: PropTypes.array,
    sortType: PropTypes.string,
    filteredGoals: PropTypes.array,
  }).isRequired,
  fetchGoals: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  historyState: state.history,
});

const mapDispatchToProps = dispatch => ({
  fetchGoals: bindActionCreators(fetch, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
