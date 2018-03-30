import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from './MainMenu';

class BattlePage extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="battlepage">
        <Grid centered stretched>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Battle</Header>
            <Divider hidden />
            <BattleInterfaceTop />
            <BattleInterfaceBottom />
          </Grid.Column>
        </Grid>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

export default connect(null, null)(BattlePage);
