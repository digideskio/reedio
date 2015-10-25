module.exports = {

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
