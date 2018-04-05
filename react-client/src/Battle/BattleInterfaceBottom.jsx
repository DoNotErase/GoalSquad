import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Grid, Progress, Image, Button, Header, Confirm, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as unboundFightActions from './fightActions';

class BattleInterfaceBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // gameEndOpen: this.props.surrenderPlayer ? true : false, // this line doesn't work
    };
    this.show = this.show.bind(this);
    // this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.gameEndShow = this.gameEndShow.bind(this);
    this.gameEndClose = this.gameEndClose.bind(this);
    this.winState = this.winState.bind(this);
  }

  gameEndShow(dimmer) {
    this.setState({ dimmer, gameEndOpen: true });
  }
  gameEndClose() {
    this.props.fightActions.resetState();
    // this.setState({ gameEndOpen: false });
  }

  show() {
    this.setState({ open: true });
  }
  handleCancel() {
    this.setState({ open: false });
  }

  iWon() {
    const { fightState } = this.props;
    if (fightState.playeriam === 'player1' && fightState.monster1CurrentHP > 0) {
      return true;
    } else if (fightState.playeriam === 'player2' && fightState.monster2CurrentHP > 0) {
      return true;
    }
    return false;
  }

  monsterLevelUp(iWon, monster, xp) {
    const { squaddieActions } = this.props;
    if (iWon) {
      return (
        <div>
          <Header as="h5"> Congratulations! </Header>
          <p> You won this battle and {monster.monster_name}
             has gained {xp} XP and has leveled up
          </p>
          <Image src={monster.monster_pic} />
          <p> Attack: {monster.user_monster_attack + 1} </p>
          <p> Defense: {monster.user_monster_defense + 1} </p>
          <p> MaxHP: {(monster.user_monster_level + 2) * 5} </p>
        </div>
      );
    }
    return (
      <div>
        <Header as="h5"> Defeat! </Header>
        <p> You lost this battle but {monster.monster_name} has gained
          {xp} XP and has leveled up and is now level {monster.user_monster_level + 1}!
        </p>
        <Image src={monster.monster_pic} />
        <p> Attack: {monster.user_monster_attack + 1} </p>
        <p> Defense: {monster.user_monster_defense + 1} </p>
        <p> MaxHP: {(monster.user_monster_level + 2) * 5} </p>
      </div>
    );
  }

  winState() {
    const { fightState, fightActions } = this.props;
    if (fightState.monster1CurrentHP > 0 && fightState.monster2CurrentHP > 0) {
      return ''; // only actually run once game is over;
    }
    const calculateXP = (winningMon, losingMon) => {
      // if a low level mosnter beat a high level monster
      let levelDifferential = losingMon.user_monster_level - winningMon.user_monster_level;
      if (levelDifferential < -4) {
        levelDifferential = -4;
      }
      return (levelDifferential * 2) + 10;
    };

    const checkForLevelUp = (monster, xp) => {
      if (Math.floor(monster.user_monster_current_xp / 100)
        !== Math.floor((monster.user_monster_current_xp + xp) / 100)) {
        return true;
      }
      return false;
    };

    const iWon = this.iWon();
    let XPgained;
    const yourMonster = fightState.playeriam === 'player1' ? fightState.monster1 : fightState.monster2;
    const theirMonster = fightState.playeriam === 'player1' ? fightState.monster2 : fightState.monster2;
    const monsterID = yourMonster.user_monster_id;

    if (iWon) {
      XPgained = calculateXP(yourMonster, theirMonster);
    } else { // you lost
      XPgained = 5;
    }

    fightActions.addXPtoMonster(monsterID, XPgained);

    if (checkForLevelUp(yourMonster, XPgained)) {
      fightActions.levelup(yourMonster.user_monster_id);
      return this.monsterLevelUp(iWon, yourMonster, XPgained);
    }

    if (iWon) {
      return (
        <div>
          <Header as="h5"> Victory! </Header>
          <p> You won this battle and {yourMonster.monster_name} has gained {XPgained} XP </p>
          <Image src={yourMonster.monster_pic} />
          <Progress
            style={{ marginTop: 8 }}
            size="medium"
            percent={(yourMonster.user_monster_current_xp + XPgained) % 100}
            progress
            indicating
          />
        </div>
      );
    }
    return (
      <div>
        <Header as="h5"> Defeat!! </Header>
        <p> You lost this battle but {yourMonster.monster_name} has still gained {XPgained} XP </p>
        <Image src={yourMonster.monster_pic} />
        <Progress
          style={{ marginTop: 8 }}
          size="medium"
          percent={(yourMonster.user_monster_current_xp + XPgained) % 100}
          progress
          indicating
        />
      </div>
    );
  }

  render() {
    const { monster, fightState } = this.props;
    const { dimmer } = this.state;
    // for animations
    // let addClasses = '';
    // if (!fightState.monster1WasAttacked && !fightState.monster2WasAttacked) {
    //   addClasses = 'slideInLeft';
    // } else {
    //   addClasses = this.props.wasAttacked ? 'swing' : 'base-state';
    // }
    return (
      <Segment>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Header sub size="tiny" textAlign="left">{monster.user_monster_new_name || monster.monster_name}</Header>
              <Progress
                size="small"
                progress="ratio"
                color="orange"
                value={this.props.currentHP}
                total={monster.user_monster_hp}
              />
            </Grid.Row>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    className={this.props.addClass}
                    // className={addClasses}
                    // className={`${wasAttacked} slideInLeft`}
                    src={monster.monster_pic}
                    size="small"
                    spaced="right"
                  />
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="bottom">
                  <Button
                    disabled={fightState.playeriam !== fightState.activePlayer}
                    basic
                    fluid
                    color="red"
                    content="Attack"
                    style={{ marginBottom: 2 }}
                    onClick={() =>
                      this.props.attack(fightState.roomName, this.props.attackStat, this.props.enemyDefenseStat, monster.user_monster_id)}
                  />
                  <Button
                    disabled={fightState.playeriam !== fightState.activePlayer}
                    basic
                    fluid
                    color="blue"
                    content="Defend"
                    style={{ marginBottom: 2 }}
                  />
                  <Button
                    disabled={fightState.playeriam !== fightState.activePlayer}
                    basic
                    fluid
                    color="grey"
                    content="Surrender"
                    style={{ marginBottom: 2 }}
                    onClick={() => this.show()}
                  />
                  <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={() => {
                      // this.gameEndShow(false)
                      this.props.surrender(fightState.roomName, fightState.playeriam);
                    }
                    }
                    confirmButton="Surrender"
                    cancelButton="Stay"
                  />
                  {/* Modal for surrendering */}
                  <Modal dimmer={dimmer} open={this.props.surrenderPlayer === 'player1' || this.props.surrenderPlayer === 'player2'} onClose={this.gameEndClose}>
                    <Modal.Header>{this.props.surrenderPlayer === fightState.playeriam ? 'you have' : 'oppenent has'} surrendered</Modal.Header>
                    <Modal.Content image>
                      <Modal.Description>
                        <Header>Click button to start new game!</Header>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="black" onClick={() => this.gameEndClose()}>
                        New Game
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  {/* Modal for win or loss */}
                  <Modal
                    dimmer={dimmer}
                    open={fightState.monster1CurrentHP <= 0 || fightState.monster2CurrentHP <= 0}
                    onClose={this.gameEndClose}
                  >
                    <Modal.Header>
                      Fight Over!
                    </Modal.Header>
                    <Modal.Content image>
                      <Modal.Description>
                        {this.winState()}
                        <Header>Click button to start new game!</Header>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="black" onClick={() => this.gameEndClose()}>
                        New Game
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

BattleInterfaceBottom.propTypes = {
  fightActions: PropTypes.shape({
    setLobbyInfo: PropTypes.func,
    setMonsterFighter: PropTypes.func,
    decreaseHealth: PropTypes.func,
    surrendered: PropTypes.func,
    resetState: PropTypes.func,
  }).isRequired,
  squaddieActions: PropTypes.objectOf(PropTypes.func).isRequired,
  monster: PropTypes.shape({

  }).isRequired,
  currentHP: PropTypes.number.isRequired,
  attack: PropTypes.func.isRequired,
  attackStat: PropTypes.number.isRequired,
  enemyDefenseStat: PropTypes.number.isRequired,
  surrender: PropTypes.func.isRequired,
  surrenderPlayer: PropTypes.string,
  fightState: PropTypes.shape({
    playeriam: PropTypes.string,
    player1: PropTypes.string,
    player2: PropTypes.string,
    monster1: PropTypes.object,
    monster2: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    fightState: state.fight,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fightActions: bindActionCreators(unboundFightActions, dispatch),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(BattleInterfaceBottom);
