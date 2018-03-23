import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import MainMenu from './MainMenu';
import SquaddieCard from './SquaddieCard';

class SquadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squaddies: [],
    };
  }

  componentDidMount() {
    
  }

  render(props) {
    return (
      <div className="squadpage">
        <Header as="h1" className="white" textAlign="right">Your Squad</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment compact>
                <Card.Group itemsPerRow={3} centered>
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                  <SquaddieCard />
                </Card.Group>
              </Segment>
            </Scrollbars>
          </Grid.Column>
          <MainMenu history={this.props.history} />
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

