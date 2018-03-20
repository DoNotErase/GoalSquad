import React from 'react';
import { Button, Modal, Icon, Grid, Link } from 'semantic-ui-react';

const MainMenu = () => (
  <Modal
    size="tiny"
    style={{ width: '50%' }}
    trigger={
      <Button
        icon
        circular
        size="huge"
        color="orange"
        className="menubutton"
      ><Icon name="tasks" />
      </Button>}
  >
    <Modal.Content>
      <Grid padded stretched textAlign="center">
        <Grid.Row>
          <Button
            icon
            inverted
            color="green"
            as={Link}
            href="/barn"
          >
            <Icon name="home" size="big" />
            Barn
          </Button>
          <Button
            icon
            inverted
            color="green"
            as={Link}
            href="/incubator"
          >
            <Icon name="circle outline" size="big" />
            Incubator
          </Button>
        </Grid.Row>
        <Grid.Row>
          <Button
            icon
            inverted
            color="green"
            as={Link}
            href="/goals"
          >
            <Icon name="road" size="big" />
            Goals
          </Button>
          <Button
            icon
            inverted
            color="green"
            as={Link}
            href="/logout"
          >
            <Icon name="external" size="big" />
            Logout
          </Button>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  </Modal>
);

export default MainMenu;
