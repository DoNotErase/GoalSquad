import React from 'react';
import { Accordion, Icon, Segment, Grid, Modal, Button, Image, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as goalsActions from '../actions/createGoalActions';
import Goal from './Goal';

class GoalsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div className="goalspage">
        <Grid centered>
          <Grid.Column computer={8} mobile={14}>
            <Accordion styled fluid>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Distance
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Segment.Group raised>
                  <Goal />
                  <Goal />
                </Segment.Group>
              </Accordion.Content>

              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Steps
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Segment.Group raised>
                  <Goal />
                </Segment.Group>
              </Accordion.Content>

              <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Stairs
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <Segment.Group raised>
                  <Goal />
                </Segment.Group>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid>

        {/* <div>
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
        </div> */}
      </div>
    );
  }
}

GoalsPage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  goalsState: PropTypes.objectOf(PropTypes.string).isRequired,
  goalsActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    goalsActions: bindActionCreators(goalsActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    goalsState: state.goals,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalsPage);
