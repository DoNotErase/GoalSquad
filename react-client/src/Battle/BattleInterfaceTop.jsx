import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Progress, Image, Header } from 'semantic-ui-react';

class BattleInterfaceBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  render() {
    const { fightState, monster } = this.props;
    // let addClasses = '';
    // if (!fightState.monster1WasAttacked && !fightState.monster2WasAttacked) {
    //   addClasses = 'slideInRight';
    // } else {
    //   addClasses = this.props.wasAttacked ? 'swing' : 'base-state';
    // }
    return (
      <Segment>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Header sub size="tiny" textAlign="right">{monster.user_monster_new_name || monster.monster_name}</Header>
              <Progress
                size="small"
                progress="ratio"
                color="orange"
                value={this.props.currentHP}
                total={monster.user_monster_hp}
              />
            </Grid.Row>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column />
                <Grid.Column textAlign="center" verticalAlign="bottom">
                  <Image
                    className={this.props.addClass}
                    // className={addClasses}
                    // className={`${wasAttacked} slideInRight`}
                    src={monster.monster_pic}
                    size="small"
                    spaced="right"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => (
  {
    fightState: state.fight,
  }
);

export default connect(mapStateToProps, null)(BattleInterfaceBottom);
