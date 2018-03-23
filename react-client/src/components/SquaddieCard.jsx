import React from 'react';
import { Card, Modal, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

class SquaddieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const src = './assets/misc/testcardimage.png';
    const { open, dimmer, size } = this.state;

    return (

      <Modal
        trigger={
          <Card
            raised
            image={src}
            description="Squaddie"
            onClick={() => this.show('blurring', 'tiny')}
          />
        }
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content>
          <Card centered fluid>
            <Image src="./assets/squaddies/squaddie-2.png" />
            <Card.Content>
              <Card.Header>
        Matthew
              </Card.Header>
              <Card.Meta>
                <span className="date">
          Joined in 2015
              </span>
              </Card.Meta>
              <Card.Description>
        Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
        22 Friends
              </a>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>

    );
  }
}


export default connect(null, null)(SquaddieCard);
