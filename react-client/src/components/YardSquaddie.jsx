import React from 'react';
import Draggable from 'react-draggable';
import { Image } from 'semantic-ui-react';

class YardSquaddie extends React.Component {
  constructor() {
    super();
    this.state = {
    
    };
  }


  render() {
    return (
      <Draggable bounds="body">
        <Image
          src="./assets/squaddies/scuttlebutt.png"
          size="small"
        />
      </Draggable>
    );
  }
}

export default YardSquaddie;

