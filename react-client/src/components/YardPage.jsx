import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as yardActions from '../actions/yardActions';
import MainMenu from './MainMenu';
import YardSquaddie from './YardSquaddie';

const child = {
  width: 900,
  height: '100%',
  backgroundImage: 'url(./assets/backgrounds/yard_mobile_background.png)',
  backgroundSize: 'cover',
};

class YardPage extends React.Component {
  componentDidMount() {
    this.props.yardActions.fetchSquaddies();
  }

  render() {
    /*
    if (this.props.yardState.newSquaddie) {
      have a modal showing that new squaddie
      on close: yardActions.squaddieAcknowledged()
        to set newSquaddie back to null
      newSquaddie should already be present in the main squaddie array
    }
    */

    return (
      <div className="yardpage">
        <Scrollbars>
          <div
            style={child}
          >
            <YardSquaddie />
          </div>
        </Scrollbars>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

YardPage.propTypes = {
  // state: PropTypes.shape({
  //   id: PropTypes.string,
  //   username: PropTypes.string,
  // }).isRequired,
  // actions: PropTypes.objectOf(PropTypes.func).isRequired,
  // yardState: PropTypes.objectOf(PropTypes.object).isRequired,
  yardActions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    yardActions: bindActionCreators(yardActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    yardState: state.yard,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(YardPage);
