import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>Home</h2>
            <h3>Lgs</h3>
            <input type='text' placeholder="search keyword" />
            <p>Filtered List of current lgs</p>
            <a className="App-link" href="http://localhost:3000/">Sign In</a>
            <a className="App-link" href="http://localhost:3000/">Register</a>
        </header>
      </div>
    );
  }
}

export default App;
