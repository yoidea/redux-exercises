import React, { Component, createContext } from 'react';
import './App.css';
import { createStore } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
const { Provider, Consumer } = createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.state = {
      number: 0,
      count: 0,
      increment: this.increment
    };
    store.subscribe(() => {
      this.setState({ number: store.getState() });
    });
  }

  increment() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Provider value={this.state}>
            <Consumer>
              {
                ({ count, increment }) =>  {
                  return (
                    <div>
                      <h2>{count}</h2>
                      <button onClick={increment}>INCREMENT</button>
                    </div>
                  );
                }
              }
            </Consumer>
          </Provider>
          <h2>{this.state.number}</h2>
          <button onClick={() => {
            store.dispatch({ type: 'INCREMENT' });
          }}>INCREMENT</button>
        </header>
      </div>
    );
  }
}

export default App;
