import React from 'react';
import { Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

class Egg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: props.incubatorState.egg.egg_xp, // this.props.eggPercent
    };
  }

  componentDidMount() {
    this.props.incubatorActions.fetchEggStatus();
  }

  hatchButton() {
    if (this.state.percent >= 100) {
      return (
        <button onClick={this.props.incubatorActions.hatchEgg}> Hatch Me! </button>
      );
    }
    return (<div />);
  }

  render() {
    return (
      <div>
        <Progress size="medium" value={this.state.percent} total="100" progress="percent" indicating />
        {this.hatchButton()}
      </div>
    );
  }
}

Egg.propTypes = {
  incubatorState: PropTypes.shape({
    egg: PropTypes.shape({
      egg_xp: PropTypes.number,
    }),
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({
  incubatorState: state.incubator,
});

const mapDispatchToProps = dispatch => ({
  incubatorActions: bindActionCreators(incubatorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Egg);
