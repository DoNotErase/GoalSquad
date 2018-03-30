import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment, Loader } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import SquaddieCard from './SquaddieCard';
import * as squadActions from '../actions/squaddieActions';


class SquadPage extends React.Component {
  componentDidMount() {
    if (!this.props.squadState.squaddies.length || this.props.squadState.needsUpdate) {
      this.props.squadActions.getUserSquaddies();
    }
  }

  render() {
    return (
      <div className="squadpage">
        <Grid centered>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Header as="h1" className="white" textAlign="right">Your Squad</Header>
              <Divider hidden />
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
          <MainMenu history={this.props.history} />
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
  squadActions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};


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

