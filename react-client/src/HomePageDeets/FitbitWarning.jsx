import React from 'react';
import { Header, Button, Modal, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FitbitWarning = props => (
  <Modal
    open={props.open}
    onClose={props.close}
    className="fadeIn"
  >
    <Modal.Header> Sorry!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header as="h4">
          Due to a bug that is currently being addressed by the Fitbit develoment team, this feature is not currently available for new users.
        </Header>
        <Image size="small" src="./assets/squaddies/squaggle.png" centered />
        <Header as="h4">
          GoalSquad is still fully functional without a Fitbit account so we invite you to join locally and we will let you know when this feature is available!
        </Header>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.close}> Close </Button>
      <Button onClick={props.openSignUp}> Sign up without Fitbit </Button>
      <Button><a href="/auth/fitbit"> Try anyway </a></Button>
    </Modal.Actions>
  </Modal>
);

FitbitWarning.propTypes = {
  close: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FitbitWarning;
