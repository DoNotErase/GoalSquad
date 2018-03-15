import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: ''
    }
  }

  componentWillMount() {
    axios('/user')
      .then(res => {
        this.setState({user: res.data.user});
      })
      .catch(err => {
        console.log(err);
      })
  }

  getData() {
    console.log('click')
    axios('/fitbit/lifetime')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (<div>
      <p>Hello {this.state.user}</p>

        <a href="http://127.0.0.1:3000/auth/fitbit"><button> Connect to Fitbit </button></a>
        <button onClick = {this.getData}> getLifeTimeData </button>
      </div>
    )
 
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
