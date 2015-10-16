var store = require('./store');
var React = require('react');
var App = require('./components/App');

// var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
  <App />,
  document.getElementById('app')
);
