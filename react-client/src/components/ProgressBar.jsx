import React from 'react';
import { Progress } from 'semantic-ui-react';

class Egg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 20, // this.props.eggPercent
      eggPercent: 40,
    };
  }

  // fix this once we know what is in store
  componentDidMount() {
    axios.get('/eggData', {
      params: {
        userID: this.props
      }
    })
  }
  render() {
    return (
      <Progress value={this.props.percent} total="100" progress="percent" indicating />
    );
  }
}

export default Egg;
