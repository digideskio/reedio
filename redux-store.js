var createStore = require('redux').createStore;
var applyMiddleware = require('redux').createStore;
var reducer = require('./redux-reducer');

var configureStore = function(initialState) {
  return createStore(reducer, initialState);
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
