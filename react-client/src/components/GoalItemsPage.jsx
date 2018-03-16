import React from 'react';
import  { Grid, Header, Item, List } from 'semantic-ui-react';

class GoalItemsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {

	}

	render() {
		const styles = {
			goalDiv: {
				border: '1px solid black',
				borderRadius: '5px'
			}
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
				  style={{ height: '100%' }}
				  verticalAlign="middle"
				  celled="internally"
				>
					<Grid.Column width={2}>
		        	<img src="./../../dist/assets/icons/running.png"/>
					</Grid.Column>
					<Grid.Column textAlign="left" width={12}>
						<List>
			        <List.Content>
			        	<List.Header>Goal Name goes here</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
					<Grid.Column width={2}>
						<List.Icon name="chevron right"></List.Icon>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalItemsPage