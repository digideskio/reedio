module.exports = {
  
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
