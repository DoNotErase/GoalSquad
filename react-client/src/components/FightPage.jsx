import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
// import * as goalsActions from "../actions/createGoalActions";
// import * as incubatorActions from "../actions/incubatorActions";

class Fight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:8081', // change to reducer later
    };
  }

  componentDidMount() {
  }
  render() {
    const socket = socketIOClient(this.state.endpoint);
    console.log('this.state.endpoint', this.state.endpoint);
    // console.log('socket', socket);
    // socket.emit('news', () => {
    //   console.log('data', 'hello');
    // });
    socket.on('connect', () => {
      // console.log('socket stuff', socket.id);
    });
    socket.on('broadcast', (data) => {
      // console.log('broadcast', data);
    });

    socket.on('second', (room) => {
      console.log('room info', room);
    });
    return (
      <div>
        <div>socket page</div>
        <div>{ this.state.endpoint }</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    // goalsActions: bindActionCreators(goalsActions, dispatch),
    // incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(Fight);
