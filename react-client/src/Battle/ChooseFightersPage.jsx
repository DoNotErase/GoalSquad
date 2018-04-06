import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment, Modal } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MainMenu from '../MainMenu';
import * as squadActions from '../SquaddieYard/squaddieActions';
import PickFighter from './PickFighter';

const axios = require('axios');

class ChooseFightersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squaddies: [],
      dimmer: false,
    };
  }
  componentDidMount() {
    axios.get('/userSquaddies')
      .then((squaddies) => {
        console.log('squaddies', squaddies);
        this.setState({
          squaddies: squaddies.data,
        });
      });
  }

  render() {
    const { fightState } = this.props;
    const { dimmer } = this.state;
    return (
      <div className="squadpage">
        <Grid centered>
        <Grid.Row verticalAlign="bottom" columns={2}>
                <Grid.Column mobile={8} tablet={7} computer={4}>
                  <MainMenu history={this.props.history} />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={7} computer={4}>
            <Header as="h1" className="white" textAlign="right">Your Squad</Header>
                </Grid.Column>
              </Grid.Row>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            {/* Modal for waiting for other player to choose character */}
            <Modal
              dimmer={dimmer}
              open={
                (fightState.playeriam === 'player1' && fightState.monster1.monster_name) ||
                (fightState.playeriam === 'player2' && fightState.monster2.monster_name)}
            >
              <Modal.Header>Opponent still choosing</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Header>Wait for opponent to choose their Squaddie</Header>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment compact>
                <Card.Group itemsPerRow={3} centered>
                  {this.state.squaddies.map(squaddie => (
                    <PickFighter
                      key={squaddie.user_monster_id}
                      squaddie={squaddie}
                      chooseFighter={this.props.chooseFighter}
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

ChooseFightersPage.propTypes = {
  fightState: PropTypes.shape({
    playeriam: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  chooseFighter: PropTypes.func.isRequired,
};


const mapStateToProps = state => (
  {
    state: state.main,
    squadState: state.squad,
    fightState: state.fight,
  }
);

const mapDispatchToProps = dispatch => (
  {
    squadActions: bindActionCreators(squadActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseFightersPage);

