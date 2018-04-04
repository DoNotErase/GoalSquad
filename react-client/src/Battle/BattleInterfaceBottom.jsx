import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Grid, Progress, Image, Button, Header, Confirm, Modal } from 'semantic-ui-react';
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

  componentDidMount() {
    console.log('bottom props', this.props);
  }

  gameEndShow(dimmer) {
    console.log('gameEndShow', dimmer);
    this.setState({ dimmer, gameEndOpen: true });
  }
  // TODO reset store here
  gameEndClose() {
    console.log('gameEndClose');
    this.props.fightActions.resetState();
    //this.setState({ gameEndOpen: false });
  }

  show() {
    console.log('show');
    this.setState({ open: true });
  }
  // handleConfirm() {
  //   // this.setState({ open: false });
  //   this.gameEndShow()
  // }
  handleCancel() {
    console.log('handleCancel');
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
          <p> You won this battle and {monster.monster_name} has gained {xp} and has leveled up </p>
          <Image src={monster.monster_pic} />
          <p> Attack: {monster.user_monster_attack} </p>
          <p> Defense: {monster.user_monster_defense} </p>
          <p> MaxHP: {(monster.user_monster_level + 2) * 5} </p>
        </div>
      );
    }
    return (
      <div>
        <Header as="h5"> Defeat! </Header>
        <p> You lost this battle but {monster.monster_name} has gained {xp}XP and has leveled up </p>
        <Image src={monster.monster_pic} />
        <p> Attack: {monster.user_monster_attack} </p>
        <p> Defense: {monster.user_monster_defense} </p>
        <p> MaxHP: {(monster.user_monster_level + 2) * 5} </p>
      </div>
    );
  }

  winState() {
    const { fightState, fightActions } = this.props;
    console.log('winState');
    if (fightState.monster1CurrentHP > 0 && fightState.monster2CurrentHP > 0) {
      console.log('game not over');
      return '';
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
      console.log(Math.floor(monster.user_monster_current_xp / 100));
      console.log(Math.floor((monster.user_monster_current_xp) / 100));
      if (Math.floor(monster.user_monster_current_xp / 100) !== Math.floor((monster.user_monster_current_xp + xp) / 100)) {
        console.log('level up!');
        return true;
      }
      console.log('no level!');
      return false;
    };

    const iWon = this.iWon();
    console.log(iWon);
    let XPgained;
    const yourMonster = fightState.playeriam === 'player1' ? fightState.monster1 : fightState.monster2;
    console.log('your monster: ', yourMonster.monster_name);
    const theirMonster = fightState.playeriam === 'player1' ? fightState.monster2 : fightState.monster2;
    const monsterID = yourMonster.user_monster_id;
    if (iWon) {
      XPgained = calculateXP(yourMonster, theirMonster);
    } else { // you lost
      XPgained = 5;
    }
    console.log(XPgained);
    fightActions.addXPtoMonster(monsterID, XPgained);
    if (checkForLevelUp(yourMonster, XPgained)) {
      fightActions.levelup(yourMonster.user_monster_id);
      return this.monsterLevelUp(iWon, yourMonster, XPgained);
    }
    console.log('so far!');
    if (iWon) {
      return `Congratulations! You won and ${yourMonster.monster_name} has gained ${XPgained}!`;
    }
    return `You lost this battle, but ${yourMonster.monster_name} has gained ${XPgained} for its efforts`;
  }

  render() {
    const { monster, fightState } = this.props;
    const { gameEndOpen, dimmer } = this.state;
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
                    onClick={() => this.props.attack(fightState.roomName, this.props.attackStat, this.props.enemyDefenseStat, monster.user_monster_id)}
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
                  <Modal dimmer={dimmer} open={fightState.monster1CurrentHP <= 0 || fightState.monster2CurrentHP <= 0} onClose={this.gameEndClose}>
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
