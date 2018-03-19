import React from 'react';
import { Divider, Grid, Header, Item, List, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GoalItemsPage = (props) => {
  if (props.goals) {
    return (
      <div className="goal-items-page">
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.goal-items-page {
                height: 100%;
            }
        `}
        </style>
        <Grid
          container
          columns={3}
          className="goal-item"
        >
          <List>
            {props.goals.map(goal => (
              <List.Content key={goal.user_goal_id}>
                <Grid.Column width={3}>
                  <img className="activity-icon" src={props.iconKey} alt="person running" />
                </Grid.Column>
                <Grid.Column textAlign="left" width={10}>
                  <List.Header><strong>{goal.goal_name}</strong></List.Header>
                  <List.Description>
                    {goal.user_goal_end_date}
                    <br />
                    {goal.user_goal_start_value - props.state[props.activityType]}
                  </List.Description>
                </Grid.Column>
                <Grid.Column width={3}>
                  <a href="#"><List.Icon name="chevron right" /></a> {/* goes to specific goal's detail page */}
                </Grid.Column>
              </List.Content>))
            }
          </List>
        </Grid>
      </div>
    );
  }
  return (
    <div />
  );
};

GoalItemsPage.propTypes = {
  state: PropTypes.objectOf(PropTypes.number).isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityType: PropTypes.string.isRequired,
  iconKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

export default connect(mapStateToProps, null)(GoalItemsPage);
