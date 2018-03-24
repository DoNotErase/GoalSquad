import React from 'react';
import { Card, Modal, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SquaddieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const { open, dimmer, size } = this.state;

    return (

      <Modal
        trigger={
          <Card
            raised
            image={this.props.squaddie.monster_icon}
            description={this.props.squaddie.monster_name}
            onClick={() => this.show('blurring', 'tiny')}
          />
        }
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content>
          <Card centered>
            <Image src={this.props.squaddie.monster_pic} />
            <Card.Content>
              <Card.Header>
                {this.props.squaddie.monster_name}
              </Card.Header>
              <Card.Meta>
                <span className="date">
                  Joined in 2015
                </span>
              </Card.Meta>
              <Card.Description>
                {this.props.squaddie.monster_description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                22 Friends
              </a>
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
