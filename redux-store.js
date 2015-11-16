var applyMiddleware = require('redux').applyMiddleware;
var createStore = require('redux').createStore;
var reducer = require('./redux-reducer');
var thunk = require('redux-thunk');

var createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

var configureStore = function(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
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
