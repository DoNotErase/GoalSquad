import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import MainMenu from '../MainMenu';
import * as homePageActions from '../HomePageDeets/homePageActions';

const IntermediateAdminPage = (props) => {
  const styles = {
    buffer: {
      paddingTop: '150px',
    },
  };

  return (
    <div style={styles.buffer} className="intadminpage">
      <Grid
        textAlign="center"
        verticalAlign="middle"
        centered
        container
      >
        <Grid.Row verticalAlign="middle">
          <Header>Welcome, admin user!</Header>
        </Grid.Row>
        <Grid.Row verticalAlign="middle">
          <Button basic inverted onClick={() => { props.history.push('/admin'); }}>
            <Button.Content visible>Go to admin page</Button.Content>
          </Button>
        </Grid.Row>
        <MainMenu history={props.history} />
      </Grid>
    </div>
  );
};

IntermediateAdminPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    homePageActions: bindActionCreators(homePageActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IntermediateAdminPage);
