import React, { Component } from 'react';
import {Header} from "./Header"
import {Subreddits} from "./Subreddits"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Subreddits />
      </div>
    );
  }
}

export default App;
