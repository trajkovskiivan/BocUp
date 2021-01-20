import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import App from './components/App';
import reducers from './reducers';

const logger = createLogger({});

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)


// let state = {
//   1: {
//     users : [1, 2],
//     messages: [{message: 'Hey1', sender: 1}]
//   },
//   2: {
//     users : [3, 4],
//     messages: [{message: 'Hey3', sender: 3}]
//   },
//   1: {
//     users :[5, 6],
//     messages: [{message: 'Hey5', sender: 5}]
//   }
// }

// let state = {
//   "1": {
//       users: ["one", "two"],
//       messages: [{message: "hey", sender: "one"}]
//   },
//   "3": {
//       users: ["three", "four"],
//       messages: [{message: "yo", sender: "four"}]
//   }
// }