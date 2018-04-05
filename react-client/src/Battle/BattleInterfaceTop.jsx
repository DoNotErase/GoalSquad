import React from 'react';
import { Segment, Grid, Progress, Image, Header } from 'semantic-ui-react';

const BattleInterfaceBottom = (props) => {
  const { monster } = props;

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
              value={props.currentHP}
              total={monster.user_monster_hp}
            />
            <Header sub size="tiny" textAlign="right"> Defending for {props.defendingTurns} </Header>
          </Grid.Row>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column />
              <Grid.Column textAlign="center" verticalAlign="bottom">
                <Image
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
};

export default BattleInterfaceBottom;
