import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider } from 'semantic-ui-react';

class SquadPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    const squaddies = [];
    return (
      <div className="squadpage">
        <Header as="h1" className="white" textAlign="right">Your Squad</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16} />
          <Card.Group />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

export default connect(mapStateToProps)(SquadPage);

