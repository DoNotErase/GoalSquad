import React from 'react';
import { Grid, Segment, Statistic, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import * as historyActions from '../actions/historyActions';

class HistoryList extends React.Component {
  constructor(props) {
    super(props);

    this.props.historyActions.fetch();
  }

  componentDidMount() {
    console.log('please stop being angry linter');
  }

  render() {
    return (
      <div>
        <Grid centered>
          <Scrollbars>
            <Grid.Column computer={8} mobile={16}>
              {this.props.historyState.map(goal => (
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
                          <Statistic.Value>{goal.goal_points}</Statistic.Value>
                          <Statistic.Label>points</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              ))}
            </Grid.Column>
          </Scrollbars>
        </Grid>
      </div>
    );
  }
}

HistoryList.propTypes = {
  historyActions: PropTypes.objectOf(PropTypes.func).isRequired,
  historyState: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

const mapStateToProps = state => ({
  historyState: state.history,
});

const mapDispatchToActions = dispatch => ({
  historyActions: bindActionCreators(historyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToActions)(HistoryList);
