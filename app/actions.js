var $ = require('jquery');
var constants = require('./constants');
var dispatcher = require('./dispatcher');

var actions = {

  loadStation: function(genre) {

    console.log('hey!');
    genre = genre || 'ambient';
    
    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
      data: {
        loadingStation: true
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
        console.log(res.sessionId);
        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
          data: {
            station: {
              genre: genre,
              sessionId: res.sessionId,
            },
            loadingStation: false
          }
        });

        // dispatcher.handleAction({
        //   actionType: constants.UPDATE_STORE,
        //   data: {
        //     constraints: defaultConstraints
        //   }
        // });

        actions.loadSong(res.sessionId);
      }
    });
    
  },

  loadSong: function(sessionId) {

    console.log('load song called');

    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
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

        console.log(res.song);
        
        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
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
      actionType: constants.UPDATE_STORE,
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
          actionType: constants.UPDATE_STORE,
          data: {
            constraints: constraints
          }
        });

        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
          data: {
            loadingSteer: undefined
          }
        });     

      }
    });
  }

};

module.exports = actions;
