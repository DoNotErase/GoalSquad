import React from 'react';
import { Divider, Grid, Header, Icon } from 'semantic-ui-react';
import GoalItemsPage from './GoalItemsPage.jsx';
import ProgressBar from './ProgressBarPage.jsx';
class IncubatorPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {

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

export default IncubatorPage;
