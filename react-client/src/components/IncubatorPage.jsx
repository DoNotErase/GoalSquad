import React from 'react';
import { Grid } from 'semantic-ui-react';

class IncubatorPage extends React.Component {
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
					<div> Incubator Page </div>
				</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default IncubatorPage;

