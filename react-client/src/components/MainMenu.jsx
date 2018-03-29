import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';

const src = './assets/icons/';

const MainMenu = props => (
  <Modal
    className="fadeIn"
    size="tiny"
    trigger={
      <Button
        icon
        circular
        size="huge"
        color="orange"
        className="menubutton"
      >
        <Icon name="tasks" />
      </Button>}
  >
    <Modal.Content>
      <Card.Group itemsPerRow={3}>
        <Card raised image={`${src}yard_icon.png`} onClick={() => { props.history.push('/yard'); }} />
        <Card raised image={`${src}incubator_icon.png`} onClick={() => { props.history.push('/incubator'); }} />
        <Card raised image={`${src}goals_icon.png`} onClick={() => { props.history.push('/goals'); }} />
        <Card raised image={`${src}deets_icon.png`} onClick={() => { props.history.push('/deets'); }} />
        <Card raised image={`${src}squad_icon.png`} onClick={() => { props.history.push('/squad'); }} />
        <Card raised image={`${src}battle_icon.png`} onClick={() => { props.history.push('/lobby'); }} />
        <Card raised image={`${src}logout_icon.png`} onClick={Link} href="/logout" />
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
