import React from 'react';
import { Grid } from 'semantic-ui-react';

class GoalsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
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
	        <Header as="h1" textAlign="left" className="white" content="Your Goals" />
	        <a href="/auth/fitbit">
	          <Button color="violet" fluid size="large" style={{ marginTop: 250 }}>Connect</Button>
	        </a>
				</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default GoalsPage;