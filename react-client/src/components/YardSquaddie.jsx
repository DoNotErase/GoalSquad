import React from 'react';
import { Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import * as squaddieActions from '../actions/squaddieActions';

class YardSquaddie extends React.Component {
  constructor() {
    super();
    this.state = {};
    // this.handleDrag = this.handleDrag.bind(this);
  }

  // handleDrag(e, ui) {
  //   const position = {
  //     x: this.props.squadState.yardSquaddies.x + ui.deltaX,
  //     y: this.props.squadState.yardSquaddies.y + ui.deltaY,
  //   };
  //   this.props.squaddieActions.getSquaddiePosition(position);
  // }


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
  squadState: state.squad,
});

const mapDispatchToProps = dispatch => (
  {
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(YardSquaddie);

