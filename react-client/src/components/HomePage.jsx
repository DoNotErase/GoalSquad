import React from 'react';
import { Header, Grid, Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/homePageActions';

class HomePage extends React.Component {
  componentWillMount() {
    if (!this.props.state.id) {
      this.props.actions.attemptLogin();
    }
  }

  componentDidUpdate() {
    if (this.props.state.id) {
      this.props.history.push('/landing');
    }
  }

  render() {
    return (
      <div className="homepage">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: '100%' }}
        >
          <Grid.Column width={10} style={{ maxWidth: 450 }}>
            <Image src="./assets/misc/logo.png" />
            <Button
              as="a"
              href="/auth/fitbit"
              fluid
              color="violet"
              size="large"
              style={{ marginTop: 250 }}
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
const mapStateToProps = state => ({ state: state.main });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
