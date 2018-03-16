import React from 'react';
import GoalItemsPage from './GoalItemsPage.jsx'
import { Divider, Grid, Header } from 'semantic-ui-react';

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
				marginLeft: '25px',
				marginTop: '20px'
			}
		}

		return (
			<div className="goals-page">
			
				<Grid
				  textAlign="center"
				  verticalAlign="middle"
				  style={{ height: '100%' }}
				>
				<Grid.Column width={16} className="goal-page">
					<div style={ styles.goalContainer }>
		        <Header size="large" textAlign="left">Your Goals</Header>
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