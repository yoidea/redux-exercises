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
    this.store = 0;
    this.state = {
      redux_counter_value: 0,
      context_counter_value: 0,
      counter: {
        increment: () => {
          this.setState({ context_counter_value: this.state.context_counter_value + 1 });
        },
        decrement: () => {
          this.setState({ context_counter_value: this.state.context_counter_value - 1 });
        }
      }
    };
    store.subscribe(() => {
      this.setState({ redux_counter_value: store.getState() });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Provider value={this.state}>
            <h1>Context API</h1>
            <ContextCounter />
          </Provider>
          <h1>Redux</h1>
          <ReduxCounter number={this.state.redux_counter_value} />
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
            ({ context_counter_value, counter }) => {
              return (
                <div style={{
                  borderColor: "#fff",
                  borderStyle: "solid",
                  borderRadius: "6px",
                  borderWidth: "2px",
                  padding: "10px",
                  margin: "10px"
                }}>
                  <h2>{context_counter_value}</h2>
                  <button onClick={counter.increment}>+</button>
                  <button onClick={counter.decrement}>-</button>
                </div>
              );
            }
          }
        </Consumer>
    );
  }
}

export default App;
