import React from 'react';
import { Header, Statistic, Grid, Button, Modal, Input } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as incubatorActions from '../actions/incubatorActions';

class GoalDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCurrent: '',
      errorMessage: '',
    };
    this.updateForm = this.updateForm.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
    this.updateNewCurrent = this.updateNewCurrent.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  updateNewCurrent(event) {
    this.setState({ newCurrent: event.target.value });
  }

  updateForm() {
    const { goal } = this.props;
    return (!goal.user_goal_concluded &&
      (goal.goal_difficulty === 'custom' || !this.props.state.user.fitbit_id)) ?
        <div>
          <Header as="h3">How far have you come?</Header>
          <Input
            value={this.state.newCurrent}
            onChange={this.updateNewCurrent}
            style={{ width: 50 }}
            label={{ basic: true, content: goal.goal_activity }}
            labelPosition="right"
            type="text"
          />
          <Header as="h5">Enter progress since last check-in</Header>
        </div>
      : <div />;
  }

  updateButtons() {
    const { goal, close } = this.props;
    return (!goal.user_goal_concluded &&
        (goal.goal_difficulty === 'custom' || !this.props.state.user.fitbit_id)) ?
          <Modal.Actions>
            <Header as="h5">{this.state.errorMessage}</Header>
            <Button color="black" onClick={close}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yep, that's me"
              onClick={this.submitUpdate}
            />
          </Modal.Actions>
      : <div />;
  }

  submitUpdate() {
    const validatePositiveNumber = (string) => {
      if (parseInt(string, 10) >= 0) {
        return true;
      }
      return false;
    };
    if (validatePositiveNumber(this.state.newCurrent)) {
      this.props.incubatorActions.submitProgress(this.props.goal.user_goal_id, this.state.newCurrent);
      this.props.close();
      this.setState({ errorMessage: '', newCurrent: '0' });
    } else {
      this.setState({ errorMessage: 'please enter a positive number!' });
    }
  }

  render() {
    const { goal, size, dimmer, open, close, } = this.props;
    return (
      <Modal
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={close}
        className="fadeIn"
      >
        <Modal.Header>{goal.goal_name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column>
                  GOAL STATS HERE;
                  {this.updateForm()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        {this.updateButtons()}
      </Modal>
    );
  }
}

GoalDetailModal.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  goal: PropTypes.shape({
    goal_id: PropTypes.number,
    user_goal_id: PropTypes.number,
    goal_name: PropTypes.string,
    goal_difficulty: PropTypes.string,
    goal_points: PropTypes.string,
    goal_timedivisor: PropTypes.number,
    goal_activity: PropTypes.string,
    user_goal_concluded: PropTypes.number, // really bool 0/1
  }).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => (
  { state: state.main }
);

const mapDispatchToProps = dispatch => (
  { incubatorActions: bindActionCreators(incubatorActions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetailModal);
