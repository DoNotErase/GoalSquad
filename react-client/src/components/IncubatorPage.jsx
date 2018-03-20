import React from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import GoalItemsPage from './GoalItemsPage';
import Egg from './ProgressBar';
import MainMenu from './MainMenu';
import * as actions from '../actions/actions';
import * as incubatorActions from '../actions/incubatorActions';

class IncubatorPage extends React.Component {
  componentDidMount() {
    this.props.incubatorActions.getUserGoals();
  }

  render() {
    return (
      <div className="incubatorpage">
        <Header as="h1" className="white" textAlign="right">Your Goals</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <GoalItemsPage activityType="distance" goals={this.props.incubatorState.userGoals.distance} />
            <GoalItemsPage activityType="steps" goals={this.props.incubatorState.userGoals.steps} />
            <GoalItemsPage activityType="stairs" goals={this.props.incubatorState.userGoals.stairs} />
          </Grid.Column>
        </Grid>
        <Egg />
        <MainMenu />
      </div>
    );
  }
}

IncubatorPage.propTypes = {
  // state: PropTypes.shape({
  //   id: PropTypes.string,
  //   username: PropTypes.string,
  // }).isRequired,
  // actions: PropTypes.objectOf(PropTypes.func).isRequired,
  incubatorState: PropTypes.objectOf(PropTypes.object).isRequired,
  incubatorActions: PropTypes.objectOf({
    getUserGoals: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

