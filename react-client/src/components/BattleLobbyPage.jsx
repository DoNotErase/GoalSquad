import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import * as fightActions from '../actions/fightActions';
import ChooseFightersPage from './ChooseFightersPage';
import BattlePage from './BattlePage';
import MainMenu from './MainMenu';

let socket;
const src = './assets/icons/';

const buttonstyletop = {
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
  marginTop: 150,
  borderRadius: '2rem',
};

const buttonstylebottom = {
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
  marginTop: 30,
  borderRadius: '2rem',
}

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:8081', // change to reducer later
    };
    this.chooseFighter = this.chooseFighter.bind(this);
    socket = socketIOClient('http://localhost:8081');
    // only has roomname and player1
    socket.on('hosting', (roomInfo) => {
      console.log('roomInfo', roomInfo);
      this.props.fightActions.setLobbyInfo(roomInfo, this.state.iam);
    });
    // has roomname, player1 and player2
    socket.on('joining', (roomInfo) => {
      this.props.fightActions.setLobbyInfo(roomInfo, this.state.iam);
    });
    // sets monsters for both players
    socket.on('fighter chosen', (fighterInfo) => {
      console.log('fighterInfo', fighterInfo);
      this.props.fightActions.setMonsterFighter(fighterInfo.playeriam, fighterInfo.squaddie);
    });
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
      iam: 'player1',
    });
  }
  joinGame() {
    socket.emit('join', this.props.mainState.user.user_username, (data) => {
      console.log(data);
    });
    this.setState({
      iam: 'player2',
    });
  }
  chooseFighter(roomname, playeriam, squaddie) {
    socket.emit('fighter picked', roomname, playeriam, squaddie, (data) => {
      console.log('data', data);
    });
  }

  render() {
    /*
    return (
      <div>
        <ChooseFightersPage />
      </div>
    );
    */
    // redo after testing
    // both players joined but not monsters picked

    const monsters = this.props.fightState.monster;

    if (this.props.fightState.user.player2 && (!monsters.monster1 || !monsters.monster2)) {
      return (
        <div>
          <ChooseFightersPage
            chooseFighter={this.chooseFighter}
          />
        </div>
      );
    } else if (monsters.monster1 && monsters.monster2) {
      return (
        <div>
          <BattlePage />
        </div>
      );
    }
    // host or join a game
    return (
      <div className="lobbypage">
        <Grid centered>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Lobby</Header>
            <Divider hidden />
            <Grid.Column width={12}>
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
