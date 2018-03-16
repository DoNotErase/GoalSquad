import React from 'react';
import { Header, Image, Link } from 'semantic-ui-react';

const styles = {
  eggStyle: {
    bottom: 0,
    right: 0,
  },
};

const BarnPage = () => (
  <div className="barnpage">
    <Header as="h2">Hi</Header>
    <Image
      style={styles.eggStyle}
      src="./assets/icons/eggTEST.png"
      as={Link}
      href="/"
      floated="right"
    />
  </div>
);


export default BarnPage;
