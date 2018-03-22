import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import MainMenu from './MainMenu';

class SquadPage extends React.Component {
  constructor() {
    super();
    this.state = {
      squaddies: [],
    };
  }


  render() {
    const src = './assets/misc/testcardimage.png';

    return (
      <div className="squadpage">
        <Header as="h1" className="white" textAlign="right">Your Squad</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars style={{ height: '85vh' }}>
              <Segment compact>
                <Card.Group itemsPerRow={2}>
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                  <Card raised image={src} header="monster" />
                </Card.Group>
              </Segment>
            </Scrollbars>
          </Grid.Column>
          <MainMenu />
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

