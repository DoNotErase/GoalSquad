import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    
  }

  render () {
    return (
    <div>
      "Hello World"
    </div>)
  }
}

ReactDOM.render(<HomePage />, document.getElementById('app'));