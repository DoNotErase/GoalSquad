import React from 'react';
import { Header, Image, Link } from 'semantic-ui-react';

const BarnPage = () => (
  <div className="barnpage">
    <Header as="h2">Hi</Header>
    <Image
      src="./assets/icons/eggTEST.png"
      as={Link}
      to="/goals"
      floated="right"
    />
  </div>
);

export default BarnPage;
