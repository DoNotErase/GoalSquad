import React from 'react';
import  { Grid, Header, Item, List } from 'semantic-ui-react';

class GoalItemsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {

	}

	render() {
		const activityIcons = {
			running: './assets/icons/running-512x512.png',
			biking: './assets/icons/biking-512x512.png'
		}
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
				  style={{ height: '100%' }}
				  verticalAlign="middle"
				  columns={3}
				  className="goal-item"
				>
					<Grid.Column width={3}>
		        	<img className="activity-icon" src={ activityIcons['running']} alt="person running"/>
					</Grid.Column>
					<Grid.Column textAlign="left" width={10}>
						<List>
			        <List.Content>
			        	<List.Header>Goal Name (Should be bold)</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
					<Grid.Column width={3}>
						<a href="#"><List.Icon name="chevron right"></List.Icon></a> {/*go to goals detail page*/} 
					</Grid.Column>
					<Grid.Column width={3}>
		        <img className="activity-icon" src={ activityIcons['biking']} alt="person biking"/>
					</Grid.Column>
					<Grid.Column textAlign="left" width={10}>
						<List>
			        <List.Content>
			        	<List.Header>Goal Name (Should be bold)</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
					<Grid.Column width={3}>
						<a href="#"><List.Icon name="chevron right"></List.Icon></a> {/*go to goals detail page*/} 
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalItemsPage