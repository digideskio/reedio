var express = require('./config/express');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

var app = express();

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
