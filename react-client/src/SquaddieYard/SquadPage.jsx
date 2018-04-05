import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Segment, Loader } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MainMenu from '../MainMenu';
import SquaddieCard from './SquaddieCard';
import { getUserSquaddies } from './squaddieActions';


class SquadPage extends React.Component {
  componentDidMount() {
    if (!this.props.squadState.squaddies.length || this.props.squadState.needsUpdate) {
      this.props.getUserSquaddies();
    }
  }

  render() {
    return (
      <div className="squadpage">
        <Grid centered>
          <Grid.Row verticalAlign="bottom" columns={2}>
            <Grid.Column mobile={8} tablet={5} computer={4}>
              <MainMenu history={this.props.history} />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={5} computer={4}>
              <Header as="h1" className="white" textAlign="right">Your Squad</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment>
                <Card.Group itemsPerRow={3} centered>
                  {this.props.squadState.isLoading ? <Loader active size="medium" inline="centered" />
                  :
                  this.props.squadState.squaddies.map(squaddie => (
                    <SquaddieCard
                      key={squaddie.monster_name}
                      squaddie={squaddie}
                    />))}
                </Card.Group>
              </Segment>
            </Scrollbars>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

SquadPage.propTypes = {
  squadState: PropTypes.shape({
    squaddies: PropTypes.arrayOf(PropTypes.object),
    yardSquaddies: PropTypes.arrayOf(PropTypes.object),
    needsUpdate: PropTypes.bool,
    isLoading: PropTypes.bool,
  }).isRequired,
  getUserSquaddies: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};


const mapStateToProps = state => (
  {
    squadState: state.squad,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getUserSquaddies: bindActionCreators(getUserSquaddies, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SquadPage);

