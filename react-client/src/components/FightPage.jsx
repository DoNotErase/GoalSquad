import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import * as fightActions from '../actions/fightActions';
import SquadPage from './SquadPage';


let socket;

class Fight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:8081', // change to reducer later
    };
    socket = socketIOClient('http://localhost:8081');
    socket.on('hosting', (roomName) => {
      this.props.fightActions.getSocketRoom(roomName);
    });
  }
  componentWillUnmount() {
    socket.disconnect();
    alert('Disconnecting Socket as component will unmount');
  }
  hostGame() {
    console.log('button clicked');
    socket.emit('host', (data) => {
      console.log(data);
    });
  }
  joinGame() {
    socket.emit('join', (data) => {
      console.log(data);
    })
  }

  render() {
    if (this.props.fightState.socket.socketRoom) {
      return (
        <div>
          <SquadPage />
        </div>
      );
    } else {
      return (
        <div>
          <div>socket page</div>
          <div>{this.state.endpoint}</div>
          <button onClick={() => this.hostGame()}>host</button>
          <button onClick={() => this.joinGame()}>join</button>
        </div>
      );
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
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Fight);
