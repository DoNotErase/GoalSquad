import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';

const src = './assets/misc/testcardimage.png';

const MainMenu = props => (
  <Modal
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
        <Card raised image={src} onClick={() => { props.history.push('/yard'); }} header="yard" />
        <Card raised image={src} onClick={() => { props.history.push('/incubator'); }} header="incubator" />
        <Card raised image={src} onClick={() => { props.history.push('/goals'); }} header="goals" />
        <Card raised image={src} onClick={() => { props.history.push('/deets'); }} header="deets" />
        <Card raised image={src} onClick={() => { props.history.push('/squad'); }} header="squad" />
        <Card raised image={src} onClick={Link} href="/logout" header="logout" />
      </Card.Group>
    </Modal.Content>
  </Modal>
);

export default MainMenu;
