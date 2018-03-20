import React from 'react';
import { Progress } from 'semantic-ui-react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 70, // this.state.eggPercent
    };
  }
  render() {
    return (
      <Progress size="medium" value={this.state.percent} total="100" progress indicating />
    );
  }
}

export default ProgressBar;
