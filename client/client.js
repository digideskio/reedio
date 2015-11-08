var React = require('react');
var render = require('react-dom').render;
var createStore = require('redux').createStore;
var Provider = require('react-redux').Provider;
var App = require('../shared/components/App');

var store =  require('../redux-store')();

// var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
