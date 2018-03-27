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
    const socket = socketIOClient(this.state.endpoint);
    socket.on('found room', room => this.setState({ room: room }));
  }
  hostGame() {
    const socket = socketIOClient(this.state.endpoint);

  }

  render() {
    return (
      <div>
        <div>socket page</div>
        <div>{ this.state.endpoint }</div>
        <button onClick={() => this.emitMessage()}>send</button>
        <button onClick={() => this.hostGame()}>host</button>
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
