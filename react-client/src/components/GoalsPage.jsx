import React from 'react';
import { Accordion, Icon, Segment, Grid, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import * as goalsActions from '../actions/createGoalActions';
import Goal from './Goal';
import CustomGoal from './CustomGoal';
import MainMenu from './MainMenu';

class GoalsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
    };
    this.handleClick = this.handleClick.bind(this);
    props.goalsActions.getDefaultGoals();
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }


  render() {
    const { activeIndex } = this.state;
    const goalsList = this.props.goalsState.standardGoals;
    const listItems = Object.keys(goalsList).map((category, categoryIndex) => {
      if (!this.props.incubatorState.userGoals[category] ||
        this.props.incubatorState.userGoals[category].length < 2) {
        return (
          <Accordion key={category} styled fluid>
            <Accordion.Title
              active={activeIndex === categoryIndex}
              index={categoryIndex}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              {category}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === categoryIndex}>
              <Segment.Group raised>
                {goalsList[category].map(singleGoal => (
                  <Goal
                    goal={singleGoal}
                    history={this.props.history}
                    key={singleGoal.goal_id}
                  />
                ))}
              </Segment.Group>
            </Accordion.Content>
          </Accordion>
        );
      }
    });

    return (
      <div className="goalspage">
        <Header as="h1" className="white" textAlign="right">Add A Goal</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '75vh' }}>
              <Header as="h3" className="white" textAlign="center">Available Categories</Header>
              {listItems}
              <Header as="h4" className="white" textAlign="center">
                To free up categories, complete existing goals!
              </Header>
              <CustomGoal history={this.props.history} />
            </Scrollbars>
          </Grid.Column>
          <MainMenu history={this.props.history} />
        </Grid>
      </div>
    );
  }
}

GoalsPage.propTypes = {
  incubatorState: PropTypes.objectOf(PropTypes.object).isRequired,
  goalsState: PropTypes.objectOf(PropTypes.object).isRequired,
  goalsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    // actions: bindActionCreators(actions, dispatch),
    goalsActions: bindActionCreators(goalsActions, dispatch),
    // incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    goalsState: state.goals,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GoalsPage);
