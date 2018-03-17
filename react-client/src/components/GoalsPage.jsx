import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
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
      <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name="dropdown" />
           Distance
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Segment.Group raised>
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
