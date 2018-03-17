import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';

class GoalsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state.activeIndex;
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
            <Segment padded color="green">
            Goal 1
            </Segment>
            <Segment padded color="yellow">
            Goal 2
            </Segment>
            <Segment padded color="red">
            Goal 3
            </Segment>
          </Segment.Group>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name="dropdown" />
           Steps
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
            <Segment.Group raised>
                <Segment padded color="green">
                Goal 1
                </Segment>
                <Segment padded color="yellow">
                Goal 2
                </Segment>
                <Segment padded color="red">
                Goal 3
                </Segment>
            </Segment.Group>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name="dropdown" />
           Stairs
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
            <Segment.Group raised>
                <Segment padded color="green">
                Goal 1
                </Segment>
                <Segment padded color="yellow">
                Goal 2
                </Segment>
                <Segment padded color="red">
                Goal 3
                </Segment>
            </Segment.Group>
        </Accordion.Content>
      </Accordion>
    );
  }
}


export default GoalsPage;
