import React from 'react';
import { Card, Modal, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  cardBackground: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffeff1, #fff8ff, #ffffff)',
};

class SquaddieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  // addSquaddieToYard() {

  // }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }

  render() {

    const { open, dimmer, size } = this.state;
    const { squaddie } = this.props;
    return (

      <Modal
        trigger={
          <Card
            color="orange"
            raised
            image={squaddie.user_id ? squaddie.monster_icon : './assets/misc/logo.png'}
            description={squaddie.monster_name}
            onClick={() => this.show(true, 'tiny')}
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
            <Image {/* change default image from logo? */}
              src={squaddie.user_id ? squaddie.monster_pic : './assets/misc/logo.png'}
              style={{ backgroundImage: styles.cardBackground }}
            />
            <Card.Content>
              <Card.Header>
                {squaddie.monster_name}
              </Card.Header>
              <Card.Description>
                {squaddie.user_id ? squaddie.monster_description : 'Complete goals to unlock this monster!'}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              { squaddie.user_id ?
                <Button
                  inverted
                  floated="right"
                  color="green"
                  content="Add to Yard"
                /> : <div />
              }
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    );
  }
}

SquaddieCard.propTypes = {
  squaddie: PropTypes.shape({
    monster_name: PropTypes.string,
    monster_pic: PropTypes.string,
    monster_description: PropTypes.string,
    monster_icon: PropTypes.string,
  }).isRequired,
};

export default connect(null, null)(SquaddieCard);
