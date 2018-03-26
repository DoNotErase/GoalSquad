import React from 'react';
import { Image } from 'semantic-ui-react';
import Draggable from 'react-draggable';

class YardSquaddie extends React.Component {
  constructor() {
    super();
    this.state = {
      deltaPosition: {
        x: 0, y: 0,
      },
    };

    this.handleDrag = this.handleDrag.bind(this);
  }


  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }


  render() {
    return (
      <Draggable onDrag={this.handleDrag}>
        <Image
          src="./assets/squaddies/scuttlebutt.png"
          size="small"
        />
      </Draggable>
    );
  }
}

export default YardSquaddie;

