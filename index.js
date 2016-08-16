// register and polyfill will transpile es6 on any imported code
require('babel-core/register')
require('babel-polyfill')

var express = require('express')
var handlebars = require('express-handlebars')

var app = express()

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('./dist'))

require('./routes')(app)
// require('./routes/station')(app)
require('./routes/song')(app)

var port = process.env.PORT || 8080

app.listen(port, function() {
	console.log('Express server listening on port ' + port)
})
