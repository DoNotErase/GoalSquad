import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';

const src = './assets/icons/';

const MainMenu = props => (
  <Modal
    className="fadeIn"
    size="tiny"
    closeOnDimmerClick
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
        <Card raised image={`${src}logout_icon.png`} onClick={Link} href="/logout" />
      </Card.Group>
    </Modal.Content>
  </Modal>
);

export default MainMenu;
