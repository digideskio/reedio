var song = require('../controllers/song');

module.exports = function(app) {

  app.route('/song')
    .get(song.findNextSong);
  
};
