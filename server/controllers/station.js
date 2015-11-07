var _ = require('underscore');
var echobest = require('echo-best');
var echonest = require('../helpers/echonest');

var key = process.env.ECHONEST_KEY;
var echo = echobest(key);

module.exports = {

  check: function(req, res, next) {

    var opts = {
      session_id: req.query.sessionId
    };

    echo('playlist/dynamic/info', opts, function(error, response) {
      
      if (error) {
        next();
      } else {
        res.send({
          sessionId: req.query.sessionId
        });
      }

    });

  },

  create: function(req, res, next) {

    var opts = {
      bucket: 'audio_summary',
      type: 'genre-radio',
      genre: req.query.genre      
    };

    echo('playlist/dynamic/create', opts, function(error, response) {
      
      if (error) {
        console.log('Error in create station:', error);
      }
      res.send({
        sessionId: response.session_id
      });
      // also save sess and default constraints into db user history

    });

  },

  steer: function(req, res) {

    var params = echonest.constructConstraintParams(req.query.constraints);

    var opts = _.extend(params, {
      session_id: req.query.sessionId
    });

    echo('playlist/dynamic/steer', opts, function(error, response) {
      
      if (error) {
        // res with error that did not work
      }

      res.send({success: true});

    });

  },

  list: function(req, res) {

    var opts = {
      results: 1383
    };

    echo('genre/list', opts, function(error, response) {
      
      if (error) {
        // res with error
      } 

      res.send({
        list: response.genres
      });

    });

  },

  similar: function(req, res) {

    var opts = {
      name: req.query.genre
    };
    
    echo('genre/similar', opts, function(error, response) {
      
      if (error) {
        // res with error
      } 

      res.send({
        list: response.genres
      });

    });

  }

};
