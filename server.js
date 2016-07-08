'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var config = require('./config.js');

var app = express();

var mongoUrl = process.env.MONGODB_URI || config.mongoUri;
var port = process.env.PORT || config.serverPort;

mongo.connect(mongoUrl, function (err, db) {
  if (err) throw new Error('Database failed to connect!');
  else console.log('Successfully connected to MongoDB.');

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

  routes(app, db);

  app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
  });

});
