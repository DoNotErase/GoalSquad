import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import HistorySort from './HistorySort';
import HistoryGoal from './HistoryGoal';
import MainMenu from '../MainMenu';
import { fetch } from './historyActions';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.fetchGoals();
  }

  render() {
    return (
      <div className="historypage">
        <Grid centered>
          <Grid.Row verticalAlign="bottom" columns={2}>
            <Grid.Column mobile={8} tablet={7} computer={4}>
              <MainMenu history={this.props.history} />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={7} computer={4}>
              <Header as="h1" className="white" textAlign="right">Past Goals</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Grid.Row style={{ marginBottom: '2vh' }}>
              <HistorySort />
            </Grid.Row>
            <Grid.Row>
              <Scrollbars autoHide style={{ height: '65vh' }}>
                <Segment.Group raised>
                  {this.props.sortedGoals.map(goal => (
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
      </div>
    );
  }
}

HistoryPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sortedGoals: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGoals: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sortedGoals: state.archives.sortedGoals,
});

const mapDispatchToProps = dispatch => ({
  fetchGoals: bindActionCreators(fetch, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
