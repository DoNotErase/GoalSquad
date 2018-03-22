import React from 'react';
import { Grid, Header, Divider, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import UserGoalsList from './UserGoalsList';
import ProgressBar from './ProgressBar';
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
            <Scrollbars style={{ height: '75vh' }}>
              <UserGoalsList activityType="distance" goals={this.props.incubatorState.userGoals.distance} />
              <UserGoalsList activityType="steps" goals={this.props.incubatorState.userGoals.steps} />
              <UserGoalsList activityType="stairs" goals={this.props.incubatorState.userGoals.floors} />
            </Scrollbars>
          </Grid.Column>
          <Grid.Row columns={2} style={{ position: 'fixed', bottom: 0, padding: 1 }}>
            <Grid.Column width={3}>
              <Image src="./assets/icons/egg.png" centered />
            </Grid.Column>
            <Grid.Column width={13}>
              <ProgressBar history={this.props.history} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
  // incubatorActions: PropTypes.objectOf({
  //   getUserGoals: PropTypes.func,
  // }).isRequired,
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

