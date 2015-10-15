var express = require('express');
var handlebars = require('express-handlebars');

module.exports = function() {

  var app = express();

  app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');

  require('../routes/index')(app);
  require('../routes/station')(app);
  require('../routes/song')(app);

  app.use(express.static('./public'));

  return app;

};
