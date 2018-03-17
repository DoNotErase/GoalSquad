import React from 'react';
import { Accordion, Icon, Segment, Grid } from 'semantic-ui-react';
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
        <Grid>
          <Grid.Column>
            <Accordion styled>
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
      </div>
    );
  }
}


export default GoalsPage;
