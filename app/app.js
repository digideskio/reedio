var store = require('./store');
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

// var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
