import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Statistic, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import MainMenu from './MainMenu';
import * as actions from '../actions/actions';

class DeetsPage extends React.Component {
  componentDidMount() {
    this.props.actions.fetchStats();
  }

  render() {
    const { deets } = this.props.state;
    if (Object.keys(deets).length === 0) {
      console.log('no deets!');
      return (<div />);
    }
    console.log(deets.user);
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
                            {(deets.user.total.success * 100) /
                              (deets.user.total.attempted - deets.user.total.pending)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>COMPLETE</Statistic.Value>
                        </Statistic>
                        <Statistic color="red">
                          <Statistic.Value>
                            {(deets.user.total.fail * 100) /
                              (deets.user.total.attempted - deets.user.total.pending)}%
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
                            {(deets.global.total.success * 100) /
                              (deets.global.total.attempted - deets.global.total.pending)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                        <Statistic horizontal>
                          <Statistic.Value>
                            {(deets.user.total.fail * 100) /
                              (deets.user.total.attempted - deets.user.total.pending)}%
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
              <Segment>
                <Statistic
                  horizontal
                  size="tiny"
                  label="Total Stairs"
                  value={deets.user.floors.amountComplete - deets.user.floors.amountStart}
                />
              </Segment>
              <Segment>
                <Statistic
                  horizontal
                  size="tiny"
                  label="Total Steps"
                  value={deets.user.steps.amountComplete - deets.user.steps.amountStart}
                />
              </Segment>
              <Segment>
                <Statistic
                  horizontal
                  size="tiny"
                  label="Total Miles"
                  value={deets.user.distance.amountComplete - deets.user.distance.amountStart}
                />
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <MainMenu />
        </Grid>
      </div>
    );
  }
}


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
