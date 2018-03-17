import React from 'react';
import { Divider, Grid, Header, Icon } from 'semantic-ui-react';
import GoalItemsPage from './GoalItemsPage.jsx';
import ProgressBar from './ProgressBarPage.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as incubatorActions from '../actions/incubatorActions';

class IncubatorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const styles = {
      incubatorNav: {
        padding: '20px',
      },
    };
    return (
      <div className="incubator-container">
        <style>{`
				    body > div,
				    body > div > div,
				    body > div > div > div.incubator-container {
				        height: 100%;
				    }
				`}
        </style>
        <Grid
	        container
          textAlign="center"
          style={{ height: '100%' }}
          columns={2}
        >
          <Grid.Column width={16}>
            <div className="goal-container">
	            <div className="progress-bar-container">
		            <Grid verticalAlign="middle" container columns={2}>
		            	<Grid.Column width={3}><img  src="./assets/icons/egg.png"/></Grid.Column>
		            	<Grid.Column width={13}><div className="progress-bar"><ProgressBar /></div></Grid.Column>
			          </Grid>
		          </div>
              <Grid container style={styles.incubatorNav} columns={2} verticalAlign="middle">
                <Grid.Column width={12}>
                  <Header size="large" textAlign="left">Your Goals</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                  <a href="/goals"><img className="add-goal-icon" alt="add a goal" src="./assets/icons/plus-button.png" /></a>
                </Grid.Column>
              </Grid>
              <Divider fitted />
              <div className="goals-list">
                <GoalItemsPage />
              </div>
            </div>
            <a className="logout-button" href="/logout"><Icon size="large" name="log out"/></a>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

IncubatorPage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  incubatorState: PropTypes.objectOf(PropTypes.string).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

