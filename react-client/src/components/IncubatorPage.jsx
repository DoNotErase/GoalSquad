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
			goalContainer: {
				border: '1px solid black',
				borderRadius: '5px',
				// minHeight: '500px',
				// paddingTop: '30px'
				minHeight: '100vh'
			},
			goals: {
				margin: '5px'
			},
			icon: {
				minHeight: '30px',
				maxHeight: '30px',
				minWidth: '30px',
				maxHeight: '30px'
			}
		}

		return (
			<div className="goals-page">
				<Grid
				  textAlign="center"
				  verticalAlign="middle"
				  style={{ height: '100%' }}
				>
				<Grid.Column width={16} className="goal-page" max >
					<div style={ styles.goalContainer }>
						<Grid celled="internally">
							<Grid.Column width={12}>
				        <Header width={12} size="large" textAlign="left">Your Goals</Header>
		        	</Grid.Column>
		        	<Grid.Column width={4}>
				        <a href="/goals"><img style={ styles.icon } alt="add a goal" src="./assets/icons/plus-button.png"/></a>
		        	</Grid.Column>
		        </Grid>
		        <Divider fitted />
		        <div style={ styles.goals }>
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