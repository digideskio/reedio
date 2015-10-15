module.exports = {

  constructConstraintParams: function(constraints) {

    var params = {};

    _.each(constraints, function(value, key) {
      if (typeof value === 'object') {
        params['min_' + key] = value.min;
        params['max_' + key] = value.max;
      } else {
        params[key] = value;
      }
    });

    return params;

  }
  
};
