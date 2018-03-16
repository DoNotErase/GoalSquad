import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/homePageActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.actions.attemptLogin();
  }

  componentDidMount() {
    if (this.state.authenticated) {
      this.history.push('/landingPage');
    }
  }
  render() {
    return (
      <div className="homepage">
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.homepage {
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
            <Header as="h1" textAlign="center" className="white" content="GOAL" />
            <Header as="h1" textAlign="center" className="white" content="SQUAD" />
            <a href="/auth/fitbit">
              <Button color="violet" fluid size="large" style={{ marginTop: 250 }}>Connect</Button>
            </a>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
