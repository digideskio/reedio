var createStore = require('redux').createStore;
var applyMiddleware = require('redux').createStore;
var reducer = require('./redux-store');

var configureStore = function(initialState) {
  var store = createStore(reducer, initialState);
  return store;
};

var initialState = {
  station: {
    genre: 'initial',
    sessionId: 'initial'
  },

  song: {
    ytid: 'initial'
  },

  loading: {
    station: true,
    song: true, 
  },
};

module.exports = configureStore;
