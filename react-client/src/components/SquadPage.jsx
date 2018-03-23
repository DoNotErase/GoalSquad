import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import MainMenu from './MainMenu';
import SquaddieCard from './SquaddieCard';
import * as squadActions from '../actions/squaddieActions';


class SquadPage extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.squadActions.getUserSquaddies();
  }

  render() {
    return (
      <div className="squadpage">
        <Header as="h1" className="white" textAlign="right">Your Squad</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Column computer={8} mobile={16}>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment compact>
                <Card.Group itemsPerRow={3} centered>
                  {this.props.squadState.squaddies.map(squaddie => (<SquaddieCard squaddie={squaddie} />))}
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
    squadState: state.squad,
  }
);

const mapDispatchToProps = dispatch => (
  {
    squadActions: bindActionCreators(squadActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SquadPage);

