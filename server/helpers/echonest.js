var _ = require('underscore');
var echobest = require('echo-best');

var key = process.env.ECHONEST_KEY;
var echo = echobest(key);

module.exports = {

  getNextSong: function(sessionId, callback) {
    
    var opts = {
      session_id: sessionId,
      results: 1
    };
    
    echo('playlist/dynamic/next', opts, function(err, res) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var song = {
          title: res.songs[0].title,
          artist: res.songs[0].artist_name,
          duration: res.songs[0].audio_summary.duration
        };
        callback(null, song);
      }
    });   
  },

  checkStation: function(sessionId, callback) {
    var opts = {
      session_id: sessionId
    };

    echo('playlist/dynamic/info', opts, function(error, response) {
      if (error) {
        callback(error, false);
      } else {
        callback(null, true);
      }
    });
  },

  createStation: function(genre, callback) {
    var opts = {
      bucket: 'audio_summary',
      type: 'genre-radio',
      genre: genre      
    };

    echo('playlist/dynamic/create', opts, function(error, response) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.session_id);
      }
    });
  },

  steerStation: function(params, sessionId, callback) {
    var opts = _.extend(params, {
      session_id: sessionId
    });

    echo('playlist/dynamic/steer', opts, function(error, success) {
      if (error) {
        callback(error, false);
      } else {
        callback(null, true);
      }
    });
  },

  listAllGenres: function(callback) {
    var opts = {
      results: 1383
    };

    echo('genre/list', opts, function(error, response) { 
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.genres);
      }
    });
  },

  getSimilarGenres: function(genre, callback) {
    var opts = {
      name: genre
    };
    
    echo('genre/similar', opts, function(error, response) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.genres);
      }
    });
  },

  constructConstraintParams: function(constraints) {

    var params = {};

    for (var key in constraints) {
      if (key === 'energy' || key === 'valence') {
        params['min_' + key] = constraints[key].min;
        params['max_' + key] = constraints[key].max;
      } else {
        params[key] = constraints[key].value;
      }
    }

    return params;
  } 
};
