import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Progress, Image, Button, Header, Confirm, Modal } from 'semantic-ui-react';

class BattleInterfaceBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      gameEndOpen: false,
    };
    this.show = this.show.bind(this);
    // this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.gameEndShow = this.gameEndShow.bind(this);
    this.gameEndClose = this.gameEndClose.bind(this);
  }

  gameEndShow(dimmer) {
    console.log('gameEndShow', dimmer);
    this.setState({ dimmer, gameEndOpen: true });
  }
  // TODO reset store here
  gameEndClose() {
    console.log('gameEndClose');
    this.setState({ gameEndOpen: false });
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
                    onClick={() => this.props.attack(fightState.roomName, monster.user_monster_attack, monster.user_monster_id)}
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
                    onConfirm={() => this.gameEndShow(false)}
                    confirmButton="Surrender"
                    cancelButton="Stay"
                  />
                  <Modal dimmer={dimmer} open={gameEndOpen} onClose={this.gameEndClose}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size="medium" src="/assets/images/avatar/large/rachel.png" />
                      <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>I have found the following image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="black" onClick={() => this.gameEndClose()}>
                        Nope
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

export default connect(mapStateToProps, null)(BattleInterfaceBottom);
