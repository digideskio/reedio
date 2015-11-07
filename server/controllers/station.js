var echonest = require('../helpers/echonest');

module.exports = {

  check: function(req, res, next) {

    echonest.checkStation(req.query.sessionId, function(err, found) {
      if (err) {
        next();
      } else if (found) {
        res.send({
          sessionId: req.query.sessionId
        });
      }
    });

  },

  create: function(req, res, next) {

    echonest.createStation(req.query.genre, function(err, sessionId) {
      if (err) {
        next(err);
      } else if (sessionId) {
        res.send({
          sessionId: sessionId
        });
      }
    });

  },

  steer: function(req, res) {

    var params = echonest.constructConstraintParams(req.query.constraints);

    echonest.steerStation(params, req.query.sessionId, function(err, success) {
      if (err) {
        next(err);
      } else {
        res.send({
          success: success
        });
      }
    });

  },

  list: function(req, res) {

    echonest.listAllGenres(function(err, list) {
      if (err) {
        next(err);
      } else {
        res.send({
          list: list
        });
      }
    });

  },

  similar: function(req, res) {

    echonest.getSimilarGenres(req.query.genre, function(err, list) {
      if (err) {
        next(err);
      } else {
        res.send({
          list: list
        });
      }
    });
  }
};
