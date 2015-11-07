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
