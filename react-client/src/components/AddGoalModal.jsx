import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class AddGoalModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.clode = this.close.bind(this);
  }

  show(dimmer) { this.setState({ dimmer, open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button onClick={this.show('blurring')}>Blurring</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src="/assets/images/avatar/large/rachel.png" />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button positive icon="checkmark" labelPosition="right" content="Yep, that's me" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AddGoalModal;
