import React from 'react';
import { Progress } from 'semantic-ui-react';

class ProgressBarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 70, // this.props.eggPercent
      eggPercent: 40,
    };
  }
  render() {
    return (
      <Progress size="small" value={this.state.percent} total="100" progress="percent" indicating />
    );
  }
}

export default ProgressBarPage;
