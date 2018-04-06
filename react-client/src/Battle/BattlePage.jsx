import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from '../MainMenu';

const BattlePage = (props) => {
  // if enemy is in defending state they get +2 defense from their base stat
  const calculateEnemyDefense = (monster, monsterDefending) => {
    if (monsterDefending > 0) {
      return monster.user_monster_defense + 2;
    }
    return monster.user_monster_defense;
  };
  const { fightState } = props;
  const enemy = {};
  const you = {};

  // assign you and enemy characteristics depending on who you are
  if (fightState.playeriam === 'player1') {
    enemy.monster = fightState.monster2;
    enemy.hp = fightState.monster2CurrentHP;
    // defending turns drops below zero sometimes, protect against that
    enemy.defendingTurns = fightState.monster2DefenseTurns > 0
      ? fightState.monster2DefenseTurns : 0;
    enemy.addClass = fightState.monster2Class || 'slideInRight';
    enemy.defenseStat = calculateEnemyDefense(fightState.monster2, fightState.monster2DefenseTurns);
    you.monster = fightState.monster1;
    you.hp = fightState.monster1CurrentHP;
    you.attack = fightState.monster1.user_monster_attack;
    you.defendingTurns = fightState.monster1DefenseTurns > 0 ?
      fightState.monster1DefenseTurns : 0;
    you.addClass = fightState.monster1Class || 'slideInLeft';
  } else {
    enemy.monster = fightState.monster1;
    enemy.hp = fightState.monster1CurrentHP;
    enemy.defendingTurns = fightState.monster1DefenseTurns > 0
      ? fightState.monster1DefenseTurns : 0;
    enemy.addClass = fightState.monster1Class || 'slideInRight';
    enemy.defenseStat = calculateEnemyDefense(fightState.monster1, fightState.monster1DefenseTurns);
    you.monster = fightState.monster2;
    you.hp = fightState.monster2CurrentHP;
    you.attack = fightState.monster2.user_monster_attack;
    you.defendingTurns = fightState.monster2DefenseTurns > 0 ?
      fightState.monster2DefenseTurns : 0;
    you.addClass = fightState.monster2Class || 'slideInLeft';
  }

  return (
    <div className="battlepage">
      <Grid centered>
        <Grid.Row verticalAlign="bottom" columns={2}>
          <Grid.Column mobile={8} tablet={7} computer={4}>
            <MainMenu history={this.props.history} />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={7} computer={4}>
            <Header as="h1" className="white" textAlign="right">Battle</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column computer={8} tablet={10} mobile={16}>
          <Divider hidden />
          {/* Shows enemy monster */}
          <Scrollbars>
            <BattleInterfaceTop
              monster={enemy.monster}
              currentHP={enemy.hp}
              defendingTurns={enemy.defendingTurns}
              addClass={enemy.addClass}
            />
            {/* Holds your monster and available actions */}
            <BattleInterfaceBottom
              monster={you.monster}
              currentHP={you.hp}
              attackStat={you.attack}
              defendingTurns={you.defendingTurns}
              enemyDefenseStat={enemy.defenseStat}
              attack={props.attack}
              defend={props.defend}
              surrender={props.surrender}
              surrenderPlayer={props.surrenderPlayer}
              addClass={you.addClass}
            />
          </Scrollbars>
        </Grid.Column>
      </Grid>
    </div>
  );
};

BattlePage.propTypes = {
  fightState: PropTypes.shape({
    playeriam: PropTypes.string,
  }).isRequired,
  attack: PropTypes.func.isRequired,
  defend: PropTypes.func.isRequired,
  surrender: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  surrenderPlayer: PropTypes.string,
};

const mapStateToProps = state => (
  {
    fightState: state.fight,
  }
);

export default connect(mapStateToProps, null)(BattlePage);
