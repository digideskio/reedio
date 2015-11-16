var helpers = require('./redux-actions-helpers');

var actions = {

  toggleStationLoading: function(isLoading) {
    return {
      type: 'LOADING_STATION',
      loading: isLoading
    };
  },

  toggleSongLoading: function(isLoading) {
    return {
      type: 'LOADING_SONG', 
      loading: isLoading
    };
  },

  updateStation: function(station) {
    return {
      type: 'UPDATE_STATION',
      station: station
    };
  },

  updateSong: function(song) {
    return {
      type: 'UPDATE_SONG',
      song: song
    };
  },

  loadStation: function(genre) {
    
    return function(dispatch) {

      dispatch(actions.toggleSongLoading(true));

      genre = genre || window.localStorage.getItem('last') || 'indie rock';
      var sessionId = helpers.getLastSessionId(genre);

      helpers.fetchSessionId(genre, sessionId, function(err, sessionId) {
        if (err) {
          console.error(err);
        } else {
          var station = {
            genre: genre,
            sessionId: sessionId
          };
          dispatch(actions.updateStation(station));
          dispatch(actions.toggleStationLoading(false));
          dispatch(actions.loadSong());
          helpers.setLastSessionId(genre, sessionId);
        }
      });

    };
  },

  loadSong: function(sessionId) {

    return function(dispatch, getState) {

      var state = getState();
      var sessionId = state.station.sessionId;

      dispatch(actions.toggleSongLoading(true));

      helpers.fetchSong(sessionId, function(err, song) {
        if (err) {
          console.log(err);
        } else {
          dispatch(actions.updateSong(song));
          dispatch(actions.toggleSongLoading(false));
        }
      }); 

    };

  }

};

module.exports = actions;
