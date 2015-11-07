var _ = require('underscore');
var ytnode = require('youtube-node');

var youtube = new ytnode();
var key = process.env.YOUTUBE_KEY;
youtube.setKey(key);

module.exports = self = {

  searchYoutube: function(song, callback) {

    var query = song.title + " " + song.artist;

    youtube.search(query, 5, function(err, res) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (res.items.length > 0) {
          _.extend(song, {ytid: []});
          _.each(res.items, function(item) {
            if (item.id.kind === 'youtube#video') {
              song.ytid.push(item.id.videoId);
            }
          });
          callback(null, song);
        } else {
          callback('Did not find kind=video', null);
        }
      }
    });

  },

  checkDurations: function(song, callback) {

    youtube.getById(song.ytid.toString(), function (err, res) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (res.items.length) {
          var found = false;
          for (var i = 0; i < res.items.length; i++) {
            var vidDuration = self.convertYoutubeDuration(res.items[i].contentDetails.duration);
            if (self.compareDurations(vidDuration, song.duration)) {
              song.ytid = song.ytid[i];
              found = true;
              callback(null, song);
              break; // might need to use break here?
            }
          }
          if (!found) {
            callback('Did not find match duration', null);
          }
        } else {
          callback('Did not find vid with id', null);
        }
      }
    });

  },
  
  convertYoutubeDuration: function(str) {
    var fromHours, fromMinutes, fromSeconds;

    if (str.match(/(\d+)H/)) {
      fromHours = Number(str.match(/(\d+)H/)[1]) * 60 * 60 ;
    } else {
      fromHours = 0;
    }

    if (str.match(/(\d+)M/)) {
      fromMinutes = Number(str.match(/(\d+)M/)[1]) * 60;
    } else {
      fromMinutes = 0;
    }

    if (str.match(/(\d+)S/)) {
      fromSeconds = Number(str.match(/(\d+)S/)[1]);
    } else {
      fromSeconds = 0;
    }

    var total = fromHours + fromMinutes + fromSeconds;
    return total;
  },

  compareDurations: function(vidDuration, songDuration) {
    return (Math.abs(vidDuration - songDuration) / songDuration) < 0.05;
  }
  
};
