import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterface from './BattleInterface';
import MainMenu from './MainMenu';

class BattlePage extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="battlepage">
        <Header as="h1" className="white" textAlign="right">Battle</Header>
        <Divider hidden />
        <Grid centered >
          <Grid.Column computer={8} mobile={16}>
            <BattleInterface />
            <BattleInterface />
          </Grid.Column>
        </Grid>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

export default connect(null, null)(BattlePage);
