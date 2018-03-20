import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as barnActions from '../actions/barnActions';
import MainMenu from './MainMenu';
import HorizontalScroll from 'react-scroll-horizontal';

class BarnPage extends React.Component {
  render() {
    const child = { width: '700px', height: '100%', backgroundColor: 'white' };
    return (
      <div className="barnpage">
      <HorizontalScroll>
        <Grid style={child}>
          <Grid.Column
            textAlign="right"
            stretched
            floated="right"
            width={5}
            verticalAlign="bottom"
          />
        </Grid>
        </HorizontalScroll>
        <MainMenu />
      </div>

    );
  }
}

BarnPage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  barnState: PropTypes.objectOf(PropTypes.string).isRequired,
  barnActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    barnActions: bindActionCreators(barnActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    barnState: state.barn,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BarnPage);
