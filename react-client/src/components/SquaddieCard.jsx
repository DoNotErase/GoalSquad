import React from 'react';
import { Card, Modal, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

class SquaddieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    console.log(props.squaddie);
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
            onClick={() => this.show(true, 'tiny')}
          />
        }
        className="animated slideInDown"
        style={{ background: 'transparent', boxShadow: 'none' }}
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content style={{ background: 'transparent' }}>
          <Card centered>
            <Image src={this.props.squaddie.monster_pic} />
            <Card.Content>
              <Card.Header>
                {this.props.squaddie.monster_name}
              </Card.Header>
              <Card.Description>
                {this.props.squaddie.monster_description}
              </Card.Description>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>

    );
  }
}


export default connect(null, null)(SquaddieCard);
