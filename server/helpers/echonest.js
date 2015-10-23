module.exports = {

  constructConstraintParams: function(constraints) {

    var params = {};

    for (var key in constraints) {
      if (typeof constraints[key] === 'object') {
        params['min_' + key] = constraints[key].min;
        params['max_' + key] = constraints[key].max;
      } else {
        params[key] = value;
      }
    }

    return params;
  }
  
};
