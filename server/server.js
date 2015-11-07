var express = require('express');
var handlebars = require('express-handlebars');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

var app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('./public'));

require('./routes/index')(app);
require('./routes/station')(app);
require('./routes/song')(app);

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
