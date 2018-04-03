import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import * as fightActions from './fightActions';
import ChooseFightersPage from './ChooseFightersPage';
import BattlePage from './BattlePage';
import MainMenu from '../MainMenu';

let socket;

const buttonstyletop = {
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
  marginTop: 150,
  borderRadius: '2rem',
};

const buttonstylebottom = {
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
  marginTop: 30,
  borderRadius: '2rem',
};

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chooseFighter = this.chooseFighter.bind(this);
    this.attack = this.attack.bind(this);
    this.surrender = this.surrender.bind(this);
    const { fightState } = this.props;

    const socketURL = (process.env.ROOTURL + ':' + process.env.PORT) || 'http://localhost:8080';
    socket = socketIOClient(socketURL);
    // only has roomname and player1
    socket.on('hosting', (roomInfo) => {
      this.props.fightActions.setLobbyInfo(roomInfo, this.state.playeriam);
    });
    // has roomname, player1 and player2
    socket.on('joining', (roomInfo) => {
      this.props.fightActions.setLobbyInfo(roomInfo, this.state.playeriam);
    });
    // sets monsters for both players
    socket.on('fighter chosen', (fighterInfo) => {
      this.props.fightActions.setMonsterFighter(fighterInfo.player, fighterInfo.squaddie);
    });
    socket.on('attack', ({ damage, user_monster_id }) => {
      this.props.fightActions.decreaseHealth(damage, user_monster_id);
    });
    socket.on('surrender', ({ surrenderPlayer }) => {
      // use to display that you either won or lost because someone surrendered
      console.log('surrenderPlayer', surrenderPlayer)
      this.props.fightActions.surrendered(surrenderPlayer);
    });
  }

  componentDidMount() {
  }
  componentWillUnmount() {
    socket.disconnect();
    alert('Disconnecting Socket as component will unmount');
  }
  hostGame() {
    socket.emit('host', this.props.mainState.user.user_username, (data) => {
      console.log(data);
    });
    this.setState({
      playeriam: 'player1',
      currentplayer: 'player1',
    });
  }
  joinGame() {
    socket.emit('join', this.props.mainState.user.user_username, (data) => {
      console.log(data);
    });
    this.setState({
      playeriam: 'player2',
    });
  }
  chooseFighter(roomname, playeriam, squaddie) {
    socket.emit('fighter picked', roomname, playeriam, squaddie, (data) => {
      console.log('data', data);
    });
  }
  attack(roomname, damage, defense, user_monster_id) {
    socket.emit('attack', roomname, damage, defense, user_monster_id, (data) => {
      console.log('data', data);
    });
  }

  surrender(roomname, playeriam) {
    console.log('clicked');
    socket.emit('surrender', roomname, playeriam, (data) => {
      console.log('data', data);
    });
  }

  render() {
    // both players joined but not monsters picked
    const { fightState } = this.props;

    if (fightState.player2 &&
      (!fightState.monster1.monster_name || !fightState.monster2.monster_name)) {
      return (
        <div>
          <ChooseFightersPage
            chooseFighter={this.chooseFighter}
          />
        </div>
      );
    } else if (fightState.monster1.monster_name && fightState.monster2.monster_name) {
      return (
        <div>
          <BattlePage
            monster1={fightState.monster1}
            monster2={fightState.monster2}
            playeriam={fightState.playeriam}
            currentplayer={fightState.activePlayer}
            monster1CurrentHP={fightState.monster1CurrentHP}
            monster2CurrentHP={fightState.monster2CurrentHP}
            attack={this.attack}
            surrender={this.surrender}
            surrenderPlayer={fightState.surrenderPlayer}
          />
        </div>
      );
    }
    // host or join a game
    return (
      <div className="lobbypage">
        <Grid
          centered
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Lobby</Header>
            <Divider hidden />
            <Grid.Column style={{ maxWidth: 450 }}>
              <Button
                onClick={() => this.hostGame()}
                fluid
                color="orange"
                size="large"
                style={buttonstyletop}
              >
              HOST A BATTLE
              </Button>
              <Button
                onClick={() => this.joinGame()}
                fluid
                color="orange"
                size="large"
                style={buttonstylebottom}
              >
              JOIN A BATTLE
              </Button>
            </Grid.Column>
          </Grid.Column>
          <MainMenu history={this.props.history} />
        </Grid>
      </div>
    );
    // TODO add else statement for waiting to find players if host
  }
}

const mapDispatchToProps = dispatch => (
  {
    fightActions: bindActionCreators(fightActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    fightState: state.fight,
    mainState: state.main,

  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
