import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from './MainMenu';

class BattlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log('battlepage props', this.props);
  }
  componentDidMount() {

  }

  render() {
    // monsters show up on different parts if you are player 1 or player 2
    if (this.props.playeriam === 'player1') {
      // TODO clean this up so it is DRY
      return (
        <div className="battlepage">
          <Grid centered stretched>
            <Grid.Column computer={8} tablet={10} mobile={16}>
              <Header as="h1" className="white" textAlign="right">Battle</Header>
              <Divider hidden />
              <BattleInterfaceTop
                monster={this.props.monster2}
                currentHP={this.props.monster2CurrentHP}
              />
              <BattleInterfaceBottom
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
                attackStat={this.props.monster1Attack}
                enemyDefenseStat={this.props.monster2Defense}
                attack={this.props.attack}
                surrender={this.props.surrender}
                surrenderPlayer={this.props.surrenderPlayer}
              />
            </Grid.Column>
          </Grid>
          <MainMenu history={this.props.history} />
        </div>
      );
    } else if (this.props.playeriam === 'player2') {
      return (
        <div className="battlepage">
          <Header as="h1" className="white" textAlign="right">Battle</Header>
          <Divider hidden />
          <Grid centered >
            <Grid.Column computer={8} mobile={16}>
              <BattleInterfaceTop
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
              />
              <BattleInterfaceBottom
                monster={this.props.monster2}
                currentHP={this.props.monster2CurrentHP}
                attackStat={this.props.monster2Attack}
                enemyDefenseStat={this.props.monster1Defense}
                attack={this.props.attack}
                surrender={this.props.surrender}
                surrenderPlayer={this.props.surrenderPlayer}
              />
            </Grid.Column>
          </Grid>
          <MainMenu history={this.props.history} />
        </div>
      );
    }
  }
}

export default connect(null, null)(BattlePage);
