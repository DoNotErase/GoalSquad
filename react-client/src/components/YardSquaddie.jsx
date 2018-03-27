import React from 'react';
import { Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import * as yardActions from '../actions/yardActions';

class YardSquaddie extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(e, ui) {
    const position = {
      x: this.props.yardState.position.x + ui.deltaX,
      y: this.props.yardState.position.y + ui.deltaY,
    };
    this.props.yardActions.getSquaddiePosition(position);
  }


  render() {
    return (
      <Draggable onDrag={this.handleDrag} >
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
  yardState: state.yard,
});

const mapDispatchToProps = dispatch => (
  {
    yardActions: bindActionCreators(yardActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(YardSquaddie);

