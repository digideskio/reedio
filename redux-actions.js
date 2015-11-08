var helpers = require('./redux-actions-helpers');

module.exports = {

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

      genre = genre || window.localStorage.getItem('last') || 'indie rock';
      var sessionId = helpers.getLastSessionId(genre);

      helpers.fetchSessionId(genre, session, function(err, sessionId) {
        if (err) {
          console.error(err);
        } else {
          var station = {
            genre: genre,
            sessionId: sessionId
          };
          dispatch(module.exports.updateStation(station));
          dispatch(module.exports.toggleStationLoading(false));
          module.exports.loadSong();
          helpers.setLastSessionId(genre, sessionId);
        }
      });

    };
  },

  loadSong: function(sessionId) {

    return function(dispatch, getState) {

      var state = getState();
      var sessionId = state.station.sessionId;

      dispatch(module.exports.toggleSongLoading(true));

      helpers.fetchSong(sessionId, function(err, song) {
        if (err) {
          console.log(err);
        } else {
          dispatch(module.exports.updateSong(song));
          dispatch(module.exports.toggleSongLoading(false));
        }
      }); 

    };

  }

};
