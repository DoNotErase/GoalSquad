import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import BattleInterfaceBottom from './BattleInterfaceBottom';
import BattleInterfaceTop from './BattleInterfaceTop';
import MainMenu from './MainMenu';

class BattlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);
  }
  componentDidMount() {

  }

  render() {
    // monsters show up on different parts if you are player 1 or player 2
    if (this.props.playeriam === 'player1') {
      return (
        <div className="battlepage">
          <Grid centered stretched>
            <Grid.Column computer={8} tablet={10} mobile={16}>
              <Header as="h1" className="white" textAlign="right">Battle</Header>
              <Divider hidden />
              <BattleInterfaceTop
                monster={this.props.monster2}
                currentHP={this.props.monster2CurrentHP}
              />
              <BattleInterfaceBottom
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
                attack={this.props.attack}
              />
            </Grid.Column>
          </Grid>
          <MainMenu history={this.props.history} />
        </div>
      );
    } else if (this.props.playeriam === 'player2') {
      return (
        <div className="battlepage">
          <Header as="h1" className="white" textAlign="right">Battle</Header>
          <Divider hidden />
          <Grid centered >
            <Grid.Column computer={8} mobile={16}>
              <BattleInterfaceTop
                monster={this.props.monster1}
                currentHP={this.props.monster1CurrentHP}
              />
              <BattleInterfaceBottom
                monster={this.props.monster2}
                currentHP={this.props.monster2CurrentHP}
                attack={this.props.attack}
              />
            </Grid.Column>
          </Grid>
          <MainMenu history={this.props.history} />
        </div>
      );
    }
  }
}

export default connect(null, null)(BattlePage);
