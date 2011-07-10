
/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	db,
	Document;


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.logger())
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-development');
});

app.configure('production', function(){
  app.use(express.logger())
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/nodepad-production');  
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.Document = Document = require('./models.js').Document(db);

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

// List
app.get('/documents.:format', function(req, res) {
  Document.find({}, function(err, documents) {
    console.log(documents.length)
    switch (req.params.format) {
      case 'json':
        res.send(documents.map(function(d) {
          return d.toJSON();
        }));
        break;

      default:
        console.log('html')
        res.render('documents/index.jade');
    }
  });
});

// Create 
app.post('/documents.:format?', function(req, res) {
  var document = new Document(req.body['document']);
  document.save(function(err) {
    switch (req.params.format) {
      case 'json':
        res.send(document.__doc);
        break;

       default:
        res.redirect('/documents');
    }
  });
});

// Read
app.get('/documents/:id.:format?', function(req, res) {
});

// Update
app.put('/documents/:id.:format?', function(req, res) {
});

// Delete
app.del('/documents/:id.:format?', function(req, res) {
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
