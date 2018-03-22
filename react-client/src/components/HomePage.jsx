import React from 'react';
import { Grid, Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as homePageActions from '../actions/homePageActions';
import * as actions from '../actions/actions';

class HomePage extends React.Component {
  componentWillMount() {
    if (!this.props.state.id) {
      this.props.homePageActions.attemptLogin();
    }
  }

  componentDidUpdate() {
    if (this.props.state.id) {
      this.props.history.push('/incubator');
    }
  }

  componentWillUnmount() {
    this.props.actions.getLifetimeData();
  }

  render() {
    return (
      <div className="homepage">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: '100%' }}
        >
          <Grid.Column width={12} style={{ maxWidth: 450 }}>
            <Image src="./assets/misc/logo.png" style={{ marginTop: 50 }} size="huge" />
            <Button
              as="a"
              href="/auth/fitbit"
              fluid
              color="orange"
              size="large"
              style={{ marginTop: 100 }}
            >Connect
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  homePageActions: PropTypes.objectOf(PropTypes.func).isRequired,
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

const mapDispatchToProps = dispatch => ({
  homePageActions: bindActionCreators(homePageActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
});
const mapStateToProps = state => ({ state: state.main });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
