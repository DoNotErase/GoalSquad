import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import * as fightActions from '../actions/fightActions';
import ChooseFightersPage from './ChooseFightersPage';

let socket;

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:8081', // change to reducer later
    };
    socket = socketIOClient('http://localhost:8081');
    // only has roomname and player1
    socket.on('hosting', (roomInfo) => {
      console.log('roomInfo', roomInfo);
      this.props.fightActions.setLobbyInfo(roomInfo);
    });
    // has roomname, player1 and player2
    socket.on('joining', (roomInfo) => {
      this.props.fightActions.setLobbyInfo(roomInfo);
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
  chooseFighter(userMonsterID) {

  }

  render() {
    // both players joined but not monsters picked
    if (this.props.fightState.user.player2 && !this.props.fightState.fightingMonster) {
      return (
        <div>
          <ChooseFightersPage />
        </div>
      );
    } else {
      // host or join a game
      return (
        <div>
          <div>socket page</div>
          <div>{this.state.endpoint}</div>
          <button onClick={() => this.hostGame()}>host</button>
          <button onClick={() => this.joinGame()}>join</button>
        </div>
      );
      // TODO add else statement for waiting to find players if host
    }
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
