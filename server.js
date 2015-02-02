// dependencies
var express = require('express');
var captions = require('node-captions');
var fs = require('fs');
var AdmZip = require('adm-zip');
var request = require('request');
var log = require('debug')('app:server');
// relative dependencies
var errors = require('./lib/errors');
var routes = require('./lib/routes');
// app instance
var app = express();
// app settings
app.set('port', process.env.PORT || 3000);
app.set('views', './lib/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
// app modules
app.use('/views', routes.views);
app.get('/api/subs/:zip', function(req, res) {
  var url = 'http://www.yifysubtitles.com/subtitle-api/' + req.params.zip;
  request(url)
    .pipe(fs.createWriteStream('sub.zip'))
    .on('close', function () {
      var zip = new AdmZip('sub.zip');
      fs.unlink('sub.zip');
      var files = zip.getEntries();
      files.forEach(function(file) {
        try {
          captions.srt.parse(file.getData(), function (err, data) {
            res.send(captions.vtt.generate(captions.srt.toJSON(data)));
          });
        } catch(e) {
          res.json({ error: 'No can do!'});
        }

      });
    });
});
app.use('*', routes.home);
// error handling
app.use(errors.notFound);
app.use(errors.defaultHandler);
// start the server
app.listen(app.get('port'), function() {
  log('started on port ' + app.get('port'));
});
