import React from 'react';
import { Card, Modal, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as squaddieActions from '../SquaddieYard/squaddieActions';
import * as fightActions from './fightActions';

const styles = {
  cardBackground: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffeff1, #fff8ff, #ffffff)',
};

class PickFighter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.close = this.close.bind(this);
  }
  close() { this.setState({ open: false }); }

  render() {
    const {
      open, dimmer, size,
    } = this.state;
    const { squaddie, fightState } = this.props;
    return (
      <Modal
        trigger={
          <Card
            raised
            image={squaddie.monster_icon}
            description={
              squaddie.user_monster_new_name ?
              squaddie.user_monster_new_name : squaddie.monster_name
            }
            // onClick={() => this.pickFighter(this.props.squaddie)}
            className="squaddieicon"
          />
        }
        className="slideInDown"
        style={{ background: 'transparent', boxShadow: 'none' }}
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content style={{ background: 'transparent' }}>
          <Card centered>
            <Image
              src={squaddie.monster_pic}
              style={{ backgroundImage: styles.cardBackground }}
            />
            <Card.Content>
              <Card.Header>
                { squaddie.user_monster_new_name ?
                  squaddie.user_monster_new_name : squaddie.monster_name
                }
                <Button
                  size="mini"
                  style={{ marginLeft: '5px' }}
                  onClick={() => {
                    this.props.chooseFighter(fightState.roomName, fightState.playeriam, squaddie);
                  }}
                >
                  pick this monster
                </Button>
              </Card.Header>
              <Card.Description>
                <span>
                ATK: {squaddie.user_monster_attack} Def: {squaddie.user_monster_defense}
                </span>
              </Card.Description>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    );
  }
}

PickFighter.propTypes = {
  squaddie: PropTypes.shape({
    monster_id: PropTypes.number,
    monster_name: PropTypes.string,
    monster_pic: PropTypes.string,
    monster_description: PropTypes.string,
    monster_icon: PropTypes.string,
  }).isRequired,
  fightState: PropTypes.shape({
    playeriam: PropTypes.string,
    roomName: PropTypes.string,
  }).isRequired,
  chooseFighter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fightState: state.fight,
  squadState: state.squad,
});

const mapDispatchToProps = dispatch => (
  {
    fightActions: bindActionCreators(fightActions, dispatch),
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PickFighter);
