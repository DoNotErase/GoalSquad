import React from 'react';
import { Image, Link, Container, Grid } from 'semantic-ui-react';

const BarnPage = () => (
  <div className="barnpage">
    <Grid>
      <Grid.Column color="blue">
        <Container>
          <Image
            src="./assets/icons/eggTEST.png"
            as={Link}
            href="/"
            verticalAlign="bottom"
            floated="right"
          />
        </Container>
      </Grid.Column>
    </Grid>
  </div>
);


export default BarnPage;
