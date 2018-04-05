import React from 'react';
import { Card, Modal, Image, Button, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toggleYardStatus, changeName } from './squaddieActions';

const styles = {
  cardBackground: 'radial-gradient(circle, #ffffff, #ffffff, #faedc4)',
  iconBackground: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffffff)',
};

class SquaddieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      yardstatus: false,
      rename: false,
      newName: '',
      alert: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.closeRename = this.closeRename.bind(this);
    this.saveRename = this.saveRename.bind(this);
  }

  toggleSquaddieToYard(monID) {
    this.setState({ yardstatus: !this.state.yardstatus });
    this.props.toggleYardStatus(monID);
  }

  saveRename() {
    const { squaddie } = this.props;
    if (this.state.newName) {
      this.props.changeName(squaddie.user.user_monster_id, this.state.newName);
      squaddie.user.user_monster_new_name = this.state.newName;
      this.setState({ alert: false });
      this.closeRename();
    } else {
      this.setState({ alert: true });
    }
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }
  closeRename() { this.setState({ rename: false }); }

  render() {
    const {
      open, dimmer, size, yardstatus, rename, alert,
    } = this.state;
    const { squaddie } = this.props;
    return (

      <Modal
        trigger={
          <Card
            color={(squaddie.user && squaddie.user.user_monster_yard) || yardstatus ? 'green' : null}
            raised
            onClick={() => this.show(true, 'tiny')}
          >
            <Image
              src={squaddie.user ? squaddie.monster_icon : './assets/squaddies/unknown-squaddie-icon.png'}
              style={{ backgroundImage: styles.iconBackground }}
            />
            <Card.Content style={{ padding: '.3em .3em' }}>
              <Card.Description>
                {squaddie.user ?
              squaddie.user.user_monster_new_name || squaddie.monster_name
              :
              squaddie.monster_name}
              </Card.Description>
            </Card.Content>
          </Card>
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
              src={squaddie.user ? squaddie.monster_pic : './assets/squaddies/unknown-squaddie.png'}
              style={{ backgroundImage: styles.cardBackground }}
            />
            <Card.Content>
              <Card.Header>
                {squaddie.user ?
                  squaddie.user.user_monster_new_name || squaddie.monster_name
                  :
                  squaddie.monster_name}
                {squaddie.user ?
                  <Button basic size="mini" style={{ marginLeft: '5px' }} onClick={() => { this.setState({ rename: true }); }}>
                  Edit
                  </Button>
                  :
                  <div />}
              </Card.Header>
              <Card.Description>
                {squaddie.user ? squaddie.monster_description : 'Complete goals to unlock this monster!'}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              { squaddie.user ?
                <div>
                  <Button icon circular onClick={this.close}>
                    <Icon name="close" />
                  </Button>
                  <Button
                    inverted
                    loading={this.props.squadState.yardLoading ? true : false}
                    floated="right"
                    color={squaddie.user.user_monster_yard ? 'red' : 'green'}
                    content={squaddie.user.user_monster_yard ? 'Remove From Yard' : 'Add to Yard'}
                    onClick={() => { this.toggleSquaddieToYard(squaddie.user.user_monster_id); }}
                  />
                </div> : <div />
              }
            </Card.Content>
          </Card>
        </Modal.Content>
        <Modal
          style={{ background: 'transparent', boxShadow: 'none' }}
          size={size}
          dimmer={dimmer}
          open={rename}
          onClose={this.closeRename}
        >
          <Modal.Content>
            <Modal.Header> Rename squaddie </Modal.Header>
            <Input
              placeholder={squaddie.monster_name}
              value={this.state.newName}
              onChange={(event) => { this.setState({ newName: event.target.value }); }}
            />
            {alert ? '  Please enter a new name!' : ''}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeRename}> Cancel </Button>
            <Button onClick={this.saveRename}> Save </Button>
          </Modal.Actions>
        </Modal>
      </Modal>
    );
  }
}

SquaddieCard.propTypes = {
  squadState: PropTypes.shape({
    yardLoading: PropTypes.bool,
  }).isRequired,
  toggleYardStatus: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  squaddie: PropTypes.shape({
    monster_id: PropTypes.number,
    monster_name: PropTypes.string,
    monster_pic: PropTypes.string,
    monster_description: PropTypes.string,
    monster_icon: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    squadState: state.squad,
  }
);

const mapDispatchToProps = dispatch => (
  {
    toggleYardStatus: bindActionCreators(toggleYardStatus, dispatch),
    changeName: bindActionCreators(changeName, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SquaddieCard);
