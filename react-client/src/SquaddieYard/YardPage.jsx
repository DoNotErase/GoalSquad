import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import * as squaddieActions from './squaddieActions';
import MainMenu from '../MainMenu';
import YardSquaddie from './YardSquaddie';

const background = {
  width: 900,
  height: '100%',
  backgroundImage: 'url(./assets/backgrounds/yard_mobile_background.png)',
  backgroundSize: 'cover',
};

class YardPage extends React.Component {
  componentDidMount() {
    this.props.squaddieActions.getYardSquaddies();
  }

  render() {
    return (
      <div className="yardpage">
        <Scrollbars>
          <div
            style={background}
          >
            {this.props.squadState.isLoading ?
              <Loader active size="medium" inline="centered" />
            :
              this.props.squadState.yardSquaddies.map(squaddie => (
                <YardSquaddie
                  key={squaddie.monster_name}
                  squaddie={squaddie}
                />))
            }
          </div>
        </Scrollbars>
        <MainMenu history={this.props.history} />
      </div>
    );
  }
}

YardPage.propTypes = {
  squadState: PropTypes.shape({
    yardSquaddies: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
  }).isRequired,
  squaddieActions: PropTypes.objectOf(PropTypes.func).isRequired,
  // yardActions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    squadState: state.squad,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(YardPage);