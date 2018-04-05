import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from '../MainMenu';

class BattlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                addClass={this.props.monster2Class || 'slideInRight'}
              />
              <BattleInterfaceBottom
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
                attackStat={this.props.monster1Attack}
                enemyDefenseStat={this.props.monster2Defense}
                attack={this.props.attack}
                surrender={this.props.surrender}
                surrenderPlayer={this.props.surrenderPlayer}
                addClass={this.props.monster1Class || 'slideInLeft'}
              />
            </Grid.Column>
          </Grid>
          <MainMenu history={this.props.history} />
        </div>
      );
    } else if (this.props.playeriam === 'player2') {
      return (
        <div className="battlepage">
          <Grid centered >
            <Grid.Row verticalAlign="bottom" columns={2}>
              <Grid.Column mobile={8} tablet={7} computer={4}>
                <MainMenu history={this.props.history} />
              </Grid.Column>
              <Grid.Column mobile={8} tablet={7} computer={4}>
                <Header as="h1" className="white" textAlign="right">Battle</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <BattleInterfaceTop
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
                addClass={this.props.monster1Class || 'slideInRight'}
              />
              <BattleInterfaceBottom
                monster={this.props.monster2}
                currentHP={this.props.monster2CurrentHP}
                attackStat={this.props.monster2Attack}
                enemyDefenseStat={this.props.monster1Defense}
                attack={this.props.attack}
                surrender={this.props.surrender}
                surrenderPlayer={this.props.surrenderPlayer}
                addClass={this.props.monster2Class || 'slideInLeft'}
              />
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}

export default connect(null, null)(BattlePage);
