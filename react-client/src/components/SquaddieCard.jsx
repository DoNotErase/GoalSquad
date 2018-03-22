import React from 'react';
import { Card, Modal } from 'semantic-ui-react';
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

  show(dimmer) { this.setState({ dimmer, open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const src = './assets/misc/testcardimage.png';
    const { open, dimmer } = this.state;

    return (

      <Modal
        trigger={<Card raised image={src} description="Squaddie" onClick={() => this.show('blurring')} />}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content>
            test
        </Modal.Content>
      </Modal>

    );
  }
}


export default connect(null, null)(SquaddieCard);
