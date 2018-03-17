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
			},
			icon: {
				minHeight: '50px',
				maxHeight: '50px',
				minWidth: '50px',
				maxHeight: '50px'
			}
		}
		const icons = {
			running: './assets/icons/running-512x512.png'
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
				  className="goal-item"
				>
					<Grid.Column width={2}>
		        	<img style={ styles.icon } src={ icons['running']} alt="running person"/>
					</Grid.Column>
					<Grid.Column textAlign="left" width={12}>
						<List>
			        <List.Content>
			        	<List.Header>Goal Name (Should be bold)</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
					<Grid.Column width={2}>
						<a href="#"><List.Icon name="chevron right"></List.Icon></a> {/*go to goals detail page*/} 
					</Grid.Column>
							<Grid.Column width={2}>
		        	<img style={ styles.icon } src={ icons['running']} alt="running person"/>
					</Grid.Column>
					<Grid.Column textAlign="left" width={12}>
						<List>
			        <List.Content>
			        	<List.Header>Goal Name (Should be bold)</List.Header>
			        	<List.Description>goal description</List.Description>
			        </List.Content>
			      </List>
					</Grid.Column>
					<Grid.Column width={2}>
						<a href="#"><List.Icon name="chevron right"></List.Icon></a> {/*go to goals detail page*/} 
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalItemsPage