import React from 'react';
import  { Grid, Header, Item } from 'semantic-ui-react';

class GoalItemsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {

	}

	render() {
		const styles = {
			goalDiv: {
				paddingTop: '10px'
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
				<Grid.Column textAlign="left" width={10} style={{ maxWidth: 450 }}>
					<Item>
		        <Item.Content>
		        	<Item.Header>Goal Name goes here</Item.Header>
		        	<Item.Meta>goal description goes here</Item.Meta>
		        	<Item.Description>this is where a description would go...if we wanted one</Item.Description>
		        </Item.Content>
		      </Item>
				</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalItemsPage