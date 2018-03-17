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
				margin: '15px'
			},
			icon: {
				minHeight: '10px',
				maxHeight: '30px',
				minWidth: '10px',
				maxHeight: '30px'
			},
			incubatorNav: {
				padding: '20px'
			}
		}

		return (
			<div className="goals-page">
				<Grid
				  textAlign="center"
				  verticalAlign="middle"
				  style={{ height: '100%' }}
				  columns={2}
				>
					<Grid.Column width={16} className="incubator-page" max >
						<div style={ styles.goalContainer }>
							<Grid style={ styles.incubatorNav } columns={2} verticalAlign="middle">
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