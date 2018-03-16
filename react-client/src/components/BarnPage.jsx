import React from 'react';
import { Header, Image, Link, Container } from 'semantic-ui-react';

const BarnPage = () => (
  <div className="barnpage">
    <Header as="h2">Hi</Header>
    <Container>
      <Image
        src="./assets/icons/eggTEST.png"
        as={Link}
        href="/"
        verticalAlign="bottom"
        floated="right"
      />
    </Container>
  </div>
);


export default BarnPage;
