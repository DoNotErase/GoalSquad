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
				border: '1px solid black'
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
				>
					<Grid.Column textAlign="left" className="goal-item" width={15} style={{ maxWidth: 500 }}>
						<List>
			        <List.Content>
			        	<img src="./../../dist/assets/icons/running.png"/>
			        	<List.Icon name="chevron right"></List.Icon>
			        	<List.Header>Goal Name goes here</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalItemsPage