import React from 'react';
import { Header, Grid, Button, Segment, Container } from 'semantic-ui-react';

const HomePage = (props) => {
    return (
        <div className='homepage'>
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.homepage {
                height: 100%;
            }
        `}</style>
            <Grid 
              textAlign='center'
              verticalAlign='middle'
              style={{ height: '80%' }} >
                <Grid.Row>
                    <Grid.Column width={10} color='blue'>
                        
                            <Header as='h1' textAlign='center' content='GOAL'/>
                            <Header as='h1' textAlign='center' content='SQUAD'/>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
       </div>
    ) 
}

export default HomePage;