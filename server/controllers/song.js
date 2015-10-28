var _ = require('underscore');
var echobest = require('echo-best');
var Promise = require('bluebird');
var youtubeHelpers = require('../helpers/youtube');
var ytnode = require('youtube-node');

var key = process.env.ECHONEST_KEY;
var echo = echobest(key);

var youtube = new ytnode();
var key = process.env.YOUTUBE_KEY;
youtube.setKey(key);

module.exports = self = {

  find: function(req, res) {

    var tries = 0;

    var next = function() {
      if (tries > 4) {
        console.log('tried too many times!');
        res.send({
          song: {
            ytid: ''
          }
        });
        return;
      }
      self.song(req.query.sessionId)
      .then(self.search)
      .then(self.duration)
      .then(function(song) {
        res.send({song: {
          ytid: song.ytid
        }});
      })
      .catch(function(err) {
        console.log('Error or null after next song recursion, calling next()');
        tries++;
        next();
      });
    };

    next();

  },

  song: function(sessionId) {

    var opts = {
      session_id: sessionId,
      results: 1
    };
    
    return new Promise(function(resolve, reject) {

      echo('playlist/dynamic/next', opts, function(err, res) {
        if (err) {
          console.log('Encountered error in song function, sending to reject');
          reject(err);
        } else {
          var song = {
            title: res.songs[0].title,
            artist: res.songs[0].artist_name,
            duration: res.songs[0].audio_summary.duration
          };
          resolve(song);
        }
      });
      
    });

  },

  search: function(song) {

    var query = song.title + " " + song.artist;

    return new Promise(function(resolve, reject) {

      youtube.search(query, 3, function(err, res) {
        if (err) {
          console.log('Encountered error in search function, sending to reject');
          reject(err);
        } else {
          if (res.items.length > 0) {
            _.extend(song, {ytid: []});
            _.each(res.items, function(item) {
              if (item.id.kind === 'youtube#video') {
                song.ytid.push(item.id.videoId);
              }
            });
            resolve(song);
          } else {
            reject('Did not find kind=video search result');
          }
        }
      });
    });

  },

  duration: function(song) {

    return new Promise(function(resolve, reject) {

      youtube.getById(song.ytid.toString(), function (err, res) {
        if (err) {
          console.log('Encountered error in duration function, sending to reject');
          reject(err);
        } else {
          if (res.items.length > 0) {
            var found = false;
            for (var i = 0; i < res.items.length; i++) {
              var vidDuration = youtubeHelpers.convertYoutubeDuration(res.items[i].contentDetails.duration);
              if (youtubeHelpers.compareDurations(vidDuration, song.duration)) {
                song.ytid = song.ytid[i];
                found = true;
                resolve(song);
                break;
              }
            }
            if (!found) {
              reject('Did not find a duration match');
            }
          } else {
            reject('Did not find video that matched id');
          }
        }
      });
      
    });

  }

};
