import React from 'react';
import { Button, Modal, Icon, Link, Card, Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';

const src = './assets/icons/';

const menustyles = {
  top: 15,
  left: 15,
  position: 'fixed',
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
};

const cardstyles = {
  backgroundImage: '#fff',
};

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
  }

  show() { this.setState({ open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const { open } = this.state;
    return (
      <Modal
        onClose={this.close}
        open={open}
        style={{ background: 'transparent', boxShadow: 'none' }}
        className="fadeIn"
        size="tiny"
        trigger={
          <Button
            icon
            circular
            size="huge"
            style={menustyles}
            onClick={this.show}
          >
            <Icon name="tasks" inverted />
          </Button>}
      >
        <Modal.Content
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Card.Group itemsPerRow={3} centered>
            <Card raised style={cardstyles} image={`${src}yard_icon.png`} onClick={() => { this.props.history.push('/yard'); }} />
            <Card raised style={cardstyles} image={`${src}incubator_icon.png`} onClick={() => { this.props.history.push('/incubator'); }} />
            <Card raised style={cardstyles} image={`${src}goals_icon.png`} onClick={() => { this.props.history.push('/goals'); }} />
            <Card raised style={cardstyles} image={`${src}deets_icon.png`} onClick={() => { this.props.history.push('/deets'); }} />
            <Card raised style={cardstyles} image={`${src}squad_icon.png`} onClick={() => { this.props.history.push('/squad'); }} />
            <Card raised style={cardstyles} image={`${src}battle_icon.png`} onClick={() => { this.props.history.push('/lobby'); }} />
            <Card raised style={cardstyles} image={`${src}history_icon.png`} onClick={() => { this.props.history.push('/history'); }} />
            <Card raised style={cardstyles} image={`${src}logout_icon.png`} onClick={Link} href="/logout" />
          </Card.Group>
        </Modal.Content>
        <Modal.Actions
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Grid centered>
            <Button
              style={{ marginTop: 50 }}
              color="grey"
              icon
              circular
              size="huge"
              onClick={this.close}
            >
              <Icon name="close" />
            </Button>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

MainMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
