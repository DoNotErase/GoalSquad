import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import * as incubatorActions from '../actions/incubatorActions';

class IncubatorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="goals-page">
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.goals-page {
                height: 100%;
            }
        `}
        </style>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: '100%' }}
        >
          <Grid.Column width={10} style={{ maxWidth: 450 }}>
            <div> Goals Page </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

IncubatorPage.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  incubatorState: PropTypes.objectOf(PropTypes.string).isRequired,
  incubatorActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
    incubatorActions: bindActionCreators(incubatorActions, dispatch),
  }
);

const mapStateToProps = state => (
  {
    state: state.main,
    incubatorState: state.incubator,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(IncubatorPage);

