import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Statistic, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import * as actions from '../actions/actions';

class DeetsPage extends React.Component {
  componentDidMount() {
    this.props.actions.fetchStats();
  }

  render() {
    const { deets } = this.props.state;

    const percentSuccess = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        return Math.ceil((statSet.success * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    const percentFailure = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        Math.floor((statSet.fail * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    console.log(deets);
    if (Object.keys(deets).length === 0) {
      return (<div />);
    }
    return (
      <div className="deetspage">
        <Header as="h1" className="white" textAlign="right">Deets</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Segment.Group raised>
              <Segment compact>
                <Grid centered>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Statistic.Group size="tiny">
                        <Statistic color="green">
                          <Statistic.Value>
                            {percentSuccess(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>COMPLETE</Statistic.Value>
                        </Statistic>
                        <Statistic color="red">
                          <Statistic.Value>
                            {percentFailure(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>FAILED</Statistic.Value>
                        </Statistic>
                      </Statistic.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment attached="bottom" compact>
                <Grid centered>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Statistic.Group size="mini">
                        <Statistic horizontal>
                          <Statistic.Value>
                            {percentSuccess(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                        <Statistic horizontal>
                          <Statistic.Value>
                            {percentFailure(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                      </Statistic.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
            <Segment.Group raised>
              {Object.keys(deets.user).map((activity) => {
                if (activity !== 'total' && activity !== 'custom') {
                  return (
                    <Segment key={activity}>
                      <Statistic
                        key={activity}
                        horizontal
                        size="tiny"
                        label={activity}
                        value={deets.user[activity].amountComplete
                          - deets.user[activity].amountStart}
                      />
                    </Segment>
                  );
                }
              })}
            </Segment.Group>
          </Grid.Column>
          <MainMenu history={this.props.history} />
        </Grid>
      </div>
    );
  }
}

DeetsPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  state: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DeetsPage);
