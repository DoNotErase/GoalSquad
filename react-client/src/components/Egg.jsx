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
  componentDidMount() {
    console.log('component did mount', this.props.name);
    for (let i = 0; i < 10; i += 1) {
      this.props.tick();
    }
    // for (let i = 0; i < this.state.eggPercent; i += 1) {
    //   // if (this.state.percent < this.state.eggPercent) {
    //   console.log('percent', this.state.percent);
    //   console.log('eggpercent', this.state.eggPercent);
    //   this.tick(this.state.percent);
    // }
  }
  // tick() {
  //   console.log('inside tick');
  //   this.setState((prevState, props) => ({ percent: prevState.percent + 1 }));
  // }
  render() {
    return (
      <Progress value={this.props.percent} total="100" progress="percent" indicating />
    );
  }
}

export default Egg;
