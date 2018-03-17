import React from 'react';
import { Image, Link, Grid } from 'semantic-ui-react';

const BarnPage = () => (
  <div className="barnpage">
    <Grid>
      <Grid.Column
        textAlign="right"
        stretched
        floated="right"
        width={5}
        verticalAlign="bottom"
      >

        <Image
          className="barnegg"
          src="./assets/icons/eggTEST.png"
          as={Link}
          href="/"
          verticalAlign="bottom"
          floated="right"
          size="massive"
        />

      </Grid.Column>
    </Grid>
  </div>
);


export default BarnPage;
