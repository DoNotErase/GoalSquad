import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.attemptLogin();
  }

  componentDidMount() {
    if (this.props.state.authenticated) {
      this.history.push('/goals');
    }
  }

  render() {
    return (
      <div>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column color="red">
            </Grid.Column>
            <Grid.Column width={8} color="blue">
              <Header as="h1" size="huge" textAlign="center">GOAL</Header>
              <Header as="h1" size="huge" textAlign="center">SQUAD</Header>
            </Grid.Column>
            <Grid.Column color="red">
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <a href="/auth/fitbit">
                <Button>Connect</Button>
              </a>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

// this attaches dispatch to an action (like login)
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

// this grabs the dispatch method from store
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
