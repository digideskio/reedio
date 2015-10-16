var $ = require('jquery');
var constants = require('./constants');
var dispatcher = require('./dispatcher');

module.exports = {

  loadStation: function(genre) {
    
    Dispatcher.handleAction({
      actionType: Constants.UPDATE_STORE,
      data: {
        loadingSession: true
      }
    });

    $.ajax({
      url: 'station',
      data: {
        genre: genre
      },
      cache: false,
      error: function(err) {
        console.log('Error w/ ajax get station:', err);
      },
      success: function(res) {
        
        dispatcher.handleAction({
          actionType: Constants.UPDATE_STORE,
          data: {
            station: {
              genre: genre,
              sessionId: res.sessionId,
            },
            loadingSession: false
          }
        });

        // dispatcher.handleAction({
        //   actionType: Constants.UPDATE_STORE,
        //   data: {
        //     constraints: defaultConstraints
        //   }
        // });

        SongActions.load(res.sessionId);
      }
    });
    
  },

  loadSong: function(sessionId) {

    dispatcher.handleAction({
      actionType: Constants.SONG_LOADING,
      data: {
        loadingSong: true
      }
    });
      
    $.ajax({
      url: 'song',
      data: {sessionId: sessionId},
      cache: false,
      error: function(err) {
        console.log('Error in ajax get song:', err);
      },
      success: function(res) {
        
        dispatcher.handleAction({
          actionType: Constants.SONG_UPDATE,
          data: {
            song: res.song,
            loadingSong: false
          }
        });

      }

    });

  },

  loadConstraints: function(genre, sessionId, param, constraints) {

    dispatcher.handleAction({
      actionType: Constants.CONSTRAINT_LOADING,
      data: {
        loadingConstraint: param
      }
    }); 

    $.ajax({
      url: 'station/constraint',
      method: 'PUT',
      type: 'PUT',
      data: {
        sessionId: sessionId,
        constraints: constraints
      },
      dataType: 'json',
      cache: false,
      error: function(err) {
        console.log('Encountered error in ajax get steer');
        console.log('Error:', err);
      },
      success: function(res) {
        
        dispatcher.handleAction({
          actionType: Constants.CONSTRAINT_UPDATE,
          data: {
            constraints: constraints
          }
        });

        dispatcher.handleAction({
          actionType: Constants.CONSTRAINT_LOADING,
          data: {
            loadingSteer: undefined
          }
        });     

      }
    });
  }

};
