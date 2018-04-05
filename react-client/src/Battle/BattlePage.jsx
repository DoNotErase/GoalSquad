import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from '../MainMenu';

const BattlePage = (props) => {
  const calculateEnemyDefense = (monster, monsterDefending) => {
    console.log(monsterDefending);
    if (monsterDefending > 0) {

      return monster.user_monster_defense + 2;
    }
    return monster.user_monster_defense;
  };

  const { fightState } = props;
  // monsters show up on different parts if you are player 1 or player 2
  if (fightState.playeriam === 'player1') {
    console.log('player 1!');
    // TODO clean this up so it is DRY
    return (
      <div className="battlepage">
        <Grid centered stretched>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Battle</Header>
            <Divider hidden />
            <BattleInterfaceTop
              monster={fightState.monster2}
              currentHP={fightState.monster2CurrentHP}
              defendingTurns={fightState.monster2DefenseTurns > 0 ? fightState.monster2DefenseTurns : 0}
            />
            <BattleInterfaceBottom
              monster={fightState.monster1}
              currentHP={fightState.monster1CurrentHP}
              attackStat={fightState.monster1.user_monster_attack}
              defendingTurns={fightState.monster1DefenseTurns > 0 ? fightState.monster1DefenseTurns : 0}
              enemyDefenseStat={calculateEnemyDefense(fightState.monster2, fightState.monster2DefenseTurns)}
              attack={props.attack}
              defend={props.defend}
              surrender={props.surrender}
              surrenderPlayer={props.surrenderPlayer}
            />
          </Grid.Column>
        </Grid>
        <MainMenu history={props.history} />
      </div>
    );
  } else if (fightState.playeriam === 'player2') {
    console.log('player 2!');
    return (
      <div className="battlepage">
        <Header as="h1" className="white" textAlign="right">Battle</Header>
        <Divider hidden />
        <Grid centered >
          <Grid.Column computer={8} mobile={16}>
            <BattleInterfaceTop
              monster={fightState.monster1}
              currentHP={fightState.monster1CurrentHP}
              defendingTurns={fightState.monster1DefenseTurns > 0 ?
                fightState.monster1DefenseTurns : 0}
            />
            <BattleInterfaceBottom
              monster={fightState.monster2}
              currentHP={fightState.monster2CurrentHP}
              attackStat={fightState.monster2.user_monster_attack}
              defendingTurns={fightState.monster2DefenseTurns > 0 ?
                fightState.monster2DefenseTurns : 0}
              enemyDefenseStat={calculateEnemyDefense(fightState.monster1, fightState.monster1DefenseTurns)}
              attack={props.attack}
              defend={props.defend}
              surrender={props.surrender}
              surrenderPlayer={props.surrenderPlayer}
            />
          </Grid.Column>
        </Grid>
        <MainMenu history={props.history} />
      </div>
    );
  }
  return <div> Somthing terrible has happened </div>;
};

const mapStateToProps = state => (
  {
    fightState: state.fight,
  }
);

export default connect(mapStateToProps, null)(BattlePage);
