import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card, Header, Divider, Segment } from 'semantic-ui-react';
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
    return (
      <div className="squadpage">
        <Grid centered>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Your Squad</Header>
            <Divider hidden />
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
          <MainMenu history={this.props.history} />
        </Grid>
      </div>
    );
  }
}

// ChooseFightersPage.propTypes = {
//   squadState: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
//   squadActions: PropTypes.objectOf(PropTypes.func).isRequired,
//   history: PropTypes.shape({
//     action: PropTypes.string,
//     block: PropTypes.func,
//     createHref: PropTypes.func,
//     go: PropTypes.func,
//     goBack: PropTypes.func,
//     goForward: PropTypes.func,
//     length: PropTypes.number,
//     listen: PropTypes.func,
//     location: PropTypes.object,
//     push: PropTypes.func,
//     replace: PropTypes.func,
//   }).isRequired,
// };


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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseFightersPage);

