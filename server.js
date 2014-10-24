// dependencies
var express = require('express');
var log = require('debug')('app:server');
// relative dependencies
var errors = require('lib/errors');
var routes = require('lib/routes');
// app instance
var app = express();
// app settings
app.set('port', process.env.PORT || 3000);
app.set('views', 'lib/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
// app modules
app.use('/views', routes.views);
app.use('*', routes.home);
// error handling
app.use(errors.notFound);
app.use(errors.defaultHandler);
// start the server
app.listen(app.get('port'), function() {
  log('started on port ' + app.get('port'));
});