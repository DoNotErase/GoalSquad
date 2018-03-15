import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  authorize() {
    axios.get('/auth/fitbit', function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res.data);
      }
    });
  }

  render () {
    return (<div>
      <button onClick={this.authorize}> Connect to Fitbit </button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
