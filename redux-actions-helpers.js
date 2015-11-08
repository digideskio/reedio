var $ = require('jquery');

module.exports = {

  getLastSessionId: function(genre) {
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

    return sessionId;
  },

  fetchSessionId: function(genre, sessionId, callback) {
    $.ajax({
      url: 'station',
      data: {
        genre: genre,
        sessionId: sessionId
      },
      cache: false,
      error: function(err) {
        callback(err, null);
      },
      success: function(res) {
        callback(null, res.sessionId);
      }
    });
  },

  setLastSessionId: function(genre, sessionId) {
    window.localStorage.setItem('last', genre);
    window.localStorage.setItem(genre, sessionId);
  },

  fetchSong: function(sessionId) {
    $.ajax({
      url: 'song',
      data: {sessionId: sessionId},
      cache: false,
      error: function(err) {
        callback(err, null);
      },
      success: function(res) {
        callback(null, res.song);
      }

    });
  }
};
