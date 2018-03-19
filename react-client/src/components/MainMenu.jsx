import React from 'react';
import { Button, Modal, Icon, Grid, Link } from 'semantic-ui-react';

class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <Modal trigger={<Button icon circular size="huge" color="purple" className="menubutton"><Icon name="tasks" /></Button>} size="tiny" style={{ width: '50%' }}>
        <Modal.Content>
          <Grid padded stretched textAlign="center">
            <Grid.Row>
              <Button icon color="green" inverted as={Link} href="/barn" >
                <Icon name="home" size="big" />
              </Button>
              <Button icon color="green" inverted as={Link} href="/incubator" >
                <Icon name="circle outline" size="big" />
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button icon color="green" inverted as={Link} href="/goals" >
                <Icon name="road" size="big" />
              </Button>
              <Button icon color="green" inverted as={Link} href="/logout" >
                <Icon name="external" size="big" />
              </Button>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MainMenu;
