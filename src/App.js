import React, {Component} from 'react';
import './App.css';

// Import Pages
import Global from './containers/Global/Global'
import Countries from './containers/Countries/Countries'

class App extends Component {
  render() {
    return (
    <div>
        <Global/>
        <Countries />        
    </div>
    )
  }
}


export default App;
