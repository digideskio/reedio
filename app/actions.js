var $ = require('jquery');
var constants = require('./constants');
var dispatcher = require('./dispatcher');
var store = require('./store');

var actions = {

  loadStation: function(genre) {

    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
      data: {
        loadingStation: true
      }
    });

    genre = genre || window.localStorage.getItem('last') || 'indie rock';
    var sessionId;

    if (typeof genre === 'string') {
      sessionId = window.localStorage.getItem(genre) || undefined;
    }

    if (sessionId) {
      try {
        sessionId = JSON.parse(sessionId);
      } catch (err) {
        console.log(err);
      }
    }

    sessionId = typeof sessionId === 'string' ? sessionId : undefined;
    
    $.ajax({
      url: 'station',
      data: {
        genre: genre,
        sessionId: sessionId
      },
      cache: false,
      error: function(err) {
        console.log('Error w/ ajax get station:', err);
      },
      success: function(res) {
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
        actions.loadConstraints();
        actions.loadSong();

        window.localStorage.setItem('last', genre);
        window.localStorage.setItem(genre, res.sessionId);
      }
    });
    
  },

  loadSong: function() {

    var sessionId = store.getStore().station.sessionId;

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

  toggleLoadingConstraint: function(param) {
    var loading = store.getStore().loadingConstraint === param ? false : param;
    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
      data: {
        loadingConstraint: loading 
      }
    }); 
  },

  loadConstraints: function(constraints) {

    constraints = constraints || store.getStore().constraints;

    var genre = store.getStore().station.genre;
    var sessionId = store.getStore().station.sessionId;

    $.ajax({
      url: 'station/constraint',
      data: {
        sessionId: sessionId,
        constraints: constraints
      },
      cache: false,
      error: function(err) {
        console.log('Encountered error in ajax get steer');
        console.log('Error:', err);
      },
      success: function(res) {

        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
          data: {
            constraints: constraints,
            loadingConstraint: false
          }
        });     

      }
    });
  },

  loadList: function() {

    $.ajax({
      url: 'station/list',
      error: function(err){
        console.log(err);
      },
      success: function(res) {
        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
          data: {
            list: res.list
          }
        });
      } 
    });

  },

  getSimilar: function() {

    $.ajax({
      url: 'station/similar',
      data: {
        genre: store.getStore().station.genre
      },
      error: function(err) {
        console.log(err);
      }, 
      success: function(res) {
        dispatcher.handleAction({
          actionType: constants.UPDATE_STORE,
          data: {
            filter: {
              search: false,
              similar: res.list
            }
          }
        });
      }
    });
  },

  updateSearchText: function(search) {
    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
      data: {
        filter: {
          search: search,
          similar: store.getStore().filter.similar
        }
      }
    });
  },

  removeFilters: function() {
    dispatcher.handleAction({
      actionType: constants.UPDATE_STORE,
      data: {
        filter: {
          search: false,
          similar: false
        }
      }
    });
  }

};

module.exports = actions;
