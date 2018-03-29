import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';

const src = './assets/icons/';

const menustyles = {
  top: 15,
  left: 15,
  position: 'fixed',
  backgroundImage: 'linear-gradient(to right, #d95a37, #df663e, #e67146, #ec7d4e, #f28857)',
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
    <Modal.Content>
      <Card.Group itemsPerRow={3} centered>
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

export default MainMenu;
