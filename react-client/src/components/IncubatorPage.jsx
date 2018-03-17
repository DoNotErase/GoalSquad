import React from 'react';
import GoalItemsPage from './GoalItemsPage.jsx'
import { Divider, Grid, Header, List } from 'semantic-ui-react';

class IncubatorPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		
	}

	render() {
		const styles = {
			incubatorNav: {
				padding: '20px'
			}
		}
		return (
			<div className="incubator-page">
			<style>{`
			    body > div,
			    body > div > div,
			    body > div > div > div.incubator-page {
			        height: 100%;
			    }
			`}
			</style>
				<Grid
				  textAlign="center"
				  verticalAlign="middle"
				  style={{ height: '100%' }}
				  columns={2}
				>
					<Grid.Column width={16} className="incubator-page">
						<div className="goal-container">
							<Grid style={ styles.incubatorNav } columns={2} verticalAlign="middle">
								<Grid.Column width={12}>
					        <Header width={12} size="large" textAlign="left">Your Goals</Header>
			        	</Grid.Column>
			        	<Grid.Column width={4}>
					        <a href="/goals"><img className="add-goal-icon" alt="add a goal" src="./assets/icons/plus-button.png"/></a>
			        	</Grid.Column>
			        </Grid>
			        <Divider fitted />
			        <div className="goals-list">
			        	<GoalItemsPage />
			        </div>
		        </div>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default IncubatorPage;