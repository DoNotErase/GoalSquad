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
      <Progress
        style={{ marginTop: 8 }}
        value={this.state.percent}
        size="medium"
        total="100"
        progress
        indicating
      />
    );
  }
}

export default ProgressBar;
