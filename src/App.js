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
    this.decrement = this.decrement.bind(this);
    this.store = 0;
    this.state = {
      number: 0,
      count: 0,
      increment: this.increment,
      decrement: this.decrement
    };
    store.subscribe(() => {
      this.setState({ number: store.getState() });
    });
  }

  increment() {
    this.setState({count: this.state.count + 1});
  }

  decrement() {
    this.setState({count: this.state.count - 1});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Provider value={this.state}>
            <ContextCounter />
          </Provider>
          <ReduxCounter number={this.state.number} />
        </header>
      </div>
    );
  }
}

class ReduxCounter extends Component {
  render() {
    return (
      <div style={{
        borderColor: "#fff",
        borderStyle: "solid",
        borderRadius: "6px",
        borderWidth: "2px",
        padding: "10px",
        margin: "10px"
      }}>
        <h2>{this.props.number}</h2>
        <button onClick={() => {
          store.dispatch({ type: 'INCREMENT' });
        }}>+</button>
        <button onClick={() => {
          store.dispatch({ type: 'DECREMENT' });
        }}>-</button>
      </div>
    );
  }
}

class ContextCounter extends Component {
  render() {
    return (
        <Consumer>
          {
            ({count, increment, decrement}) => {
              return (
                <div style={{
                  borderColor: "#fff",
                  borderStyle: "solid",
                  borderRadius: "6px",
                  borderWidth: "2px",
                  padding: "10px",
                  margin: "10px"
                }}>
                  <h2>{count}</h2>
                  <button onClick={increment}>+</button>
                  <button onClick={decrement}>-</button>
                </div>
              );
            }
          }
        </Consumer>
    );
  }
}

export default App;
