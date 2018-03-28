import React from 'react';
import { Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import * as squaddieActions from '../actions/squaddieActions';

class YardSquaddie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deltaPosition: {
        x: this.props.squaddie.user_monster_xcoord,
        y: this.props.squaddie.user_monster_ycoord,
      },
    };
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentWillUnmount() {
    this.props.squaddieActions.saveSquaddiePosition(this.state.deltaPosition);
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        id: this.props.squaddie.user_monster_id,
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }


  render() {
    return (
      <Draggable
        onDrag={this.handleDrag}
        defaultPosition={{ x: this.state.deltaPosition.x, y: this.state.deltaPosition.y }}
      >
        <Image
          src={this.props.squaddie.monster_pic}
          size="small"
        />
      </Draggable>
    );
  }
}

// YardSquaddie.propTypes = {
//   yardState: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object)).isRequired,
//   yardActions: PropTypes.objectOf(PropTypes.func).isRequired,
// };

const mapStateToProps = state => ({
  squadState: state.squad,
});

const mapDispatchToProps = dispatch => (
  {
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(YardSquaddie);

