var station = require('../controllers/station');

module.exports = function(app) {

  app.route('/station')
    .get(station.check, station.create);

  app.route('/station/constraint')
    .put(station.steer);

};
