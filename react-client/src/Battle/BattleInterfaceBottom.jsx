import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Grid, Progress, Image, Button, Header, Confirm, Modal } from 'semantic-ui-react';
import * as fightActions from './fightActions';

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
                  {/*Modal for surrendering*/}
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
                  {/*Modal for win or loss*/}
                  <Modal dimmer={dimmer} open={fightState.monster1CurrentHP <= 0 || fightState.monster2CurrentHP <= 0} onClose={this.gameEndClose}>
                    <Modal.Header>{
                    fightState.playeriam === 'player1' ?
                      (fightState.monster1CurrentHP <= 0 ? 'You have lost' : 'You have won') :
                      (fightState.monster1CurrentHP <= 0 ? 'You have won' : 'You have lost')
                    }</Modal.Header>
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
    fightActions: bindActionCreators(fightActions, dispatch),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(BattleInterfaceBottom);
