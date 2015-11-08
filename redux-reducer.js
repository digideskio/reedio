var assign = require('object-assign');

var reducer = function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case 'LOADING_STATION':
      return assign({}, state, {
        loading: {station: action.isLoading}
      });
    case 'LOADING_SONG':
      return assign({}, state, {
        loading: {song: action.isLoading}
      });
    case 'UPDATE_STATION':
      return assign({}, state, {
        station: action.station
      });
    case 'UPDATE_SONG':
      return assign({}, state, {
        song: action.song
      });
    default:
      return state;
  }
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

module.exports = reducer;
