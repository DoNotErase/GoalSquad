import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';

const HomePage = (props) => {
    return (
        <div>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' size='huge' textAlign='center'>GOAL</Header>
                        <Header as='h1' size='huge' textAlign='center'>SQUAD</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <a href="/auth/fitbit">
                            <Button>Connect</Button>
                        </a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    ) 
}

export default HomePage;