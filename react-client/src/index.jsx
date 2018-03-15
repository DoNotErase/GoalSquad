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
    axios.get('/auth/fitbit') 
  }

  render () {
    return (<div>
      <a href="http://127.0.0.1:3000/auth/fitbit"><button> Connect to Fitbit </button></a>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
