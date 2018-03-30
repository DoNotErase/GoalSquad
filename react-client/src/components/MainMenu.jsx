import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';
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

const modalstyles = {
  backgroundImage: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffffff)',
};

const cardstyles = {
  backgroundImage: '#fff',
};

const MainMenu = props => (
  <Modal
    className="fadeIn"
    size="tiny"
    trigger={
      <Button
        icon
        circular
        size="huge"
        style={menustyles}
      >
        <Icon name="tasks" inverted />
      </Button>}
  >
    <Modal.Content style={modalstyles}>
      <Card.Group itemsPerRow={3} centered>
        <Card raised style={cardstyles} image={`${src}yard_icon.png`} onClick={() => { props.history.push('/yard'); }} />
        <Card raised style={cardstyles} image={`${src}incubator_icon.png`} onClick={() => { props.history.push('/incubator'); }} />
        <Card raised style={cardstyles} image={`${src}goals_icon.png`} onClick={() => { props.history.push('/goals'); }} />
        <Card raised style={cardstyles} image={`${src}deets_icon.png`} onClick={() => { props.history.push('/deets'); }} />
        <Card raised style={cardstyles} image={`${src}squad_icon.png`} onClick={() => { props.history.push('/squad'); }} />
        <Card raised style={cardstyles} image={`${src}battle_icon.png`} onClick={() => { props.history.push('/lobby'); }} />
        <Card raised style={cardstyles} image={`${src}logout_icon.png`} onClick={Link} href="/logout" />
      </Card.Group>
    </Modal.Content>
  </Modal>
);

MainMenu.propTypes = {
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

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
