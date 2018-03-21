import React from 'react';
import { Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

class ProgressBar extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.incubatorActions.fetchEggStatus();
  }

  hatchButton() {
    if (/* this.props.incubatorState.egg.egg_xp >= 100 */ true) {
      return (
        <button
          onClick={() => {
            this.props.incubatorActions.hatchEgg();
            this.props.history.push('/barn');
          }}
        >
        Hatch Me!
        </button>
      );
    }
    return (<div />);
  }

  render() {
    return (
      <div>
        <Progress
          style={{ marginTop: 8 }}
          value={this.props.incubatorState.egg.egg_xp}
          size="medium"
          total="100"
          progress
          indicating
        />
        {this.hatchButton()}
      </div>
    );
  }
}

ProgressBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
