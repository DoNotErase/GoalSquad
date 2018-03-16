import React from 'react';
import GoalItemsPage from './GoalItemsPage.jsx'
import { Divider, Grid, Header } from 'semantic-ui-react';

class GoalsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		
	}

	render() {
		const styles = {
			goalContainer: {
				border: '1px solid black',
				minHeight: '500px',
				padding: '10px'
			}
		}

		return (
			<div className="goals-page">
			<style>{`
			    body > div,
			    body > div > div,
			    body > div > div > div.goals-page {
			        height: 100%;
			    }
			`}
			</style>
				<Grid
				  textAlign="center"
				  verticalAlign="middle"
				  style={{ height: '100%' }}
				>
				<Grid.Column width={10} style={{ maxWidth: 450 }}>
					<div style={ styles.goalContainer }>
		        <Header size="large" textAlign="left">Your Goals</Header>
		        <Divider fitted />
		        <GoalItemsPage />
	        </div>
				</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalsPage;