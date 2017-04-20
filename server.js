// Loads the express module function that we installed in the previous step.
var express = require('express');
// Create the express app. This is what you use to configure express to do what you want.
var server = express();
var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');



server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

var entries = [];
server.locals.entries = entries;

server.use(logger('dev'));
server.use(bodyParser.urlencoded({ extended: false}));
// server.use(express.static('public'));

server.get('/', function(req, res) {
  res.render('index');
});
server.get('/new-entry', function(req, res) {
  res.render('new-entry');
});

server.post('/new-entry', function(req, res) {
  if (!req.body.title || !req.body.body) {
    res.status(400).send('Entries must have a title and a body.');
    return;
  }
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  res.redirect('/');
});

server.use(function(req, res) {
  res.status(404).render('404');
});

// Configure the web app to listen on port 3001.
//   When websites are running, they are always listening on ports. Generally speaking, this is how network-based
//   applications do things, and web apps are network-based applications.
http.createServer(server).listen(9876, function() {
  // This stuff here is a callback function. After Node sets up to listen on the port, it will call this function.
  //   So, if you see this in a minute when you run the file, you did a good job.
  console.log('Listening on port 9876');
});
