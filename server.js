'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var config;

try { config = require('./config.js'); }
catch (err) { console.log('module config not found.'); }

var app = express();

var mongoUrl = process.env.MONGODB_URI || config.mongoUri;
var port = process.env.PORT || config.serverPort;

var result = { 'unix': null, 'natural': null };

mongo.connect(mongoUrl, function (err, db) {
  if (err) throw new Error('Database failed to connect!');
  else console.log('Successfully connected to MongoDB.');

  app.use('/public', express.static(process.cwd() + '/public'));

  app.param('date', function (req, res, next, value) {
    var date;
    result.unix = null;
    result.natural = null;
    // is value a number ?
    if (!Number.isNaN(+value)) date = new Date(+value);
    else date = new Date(value);
    // is date a valid Date ?
    if (!Number.isNaN(date.valueOf())) {
      result.unix = date.valueOf();
      result.natural = value;
    } 
    next();
  });

  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  });

  app.get('/:date', function (req, res, next) {
    res.json(result);
  });

  app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
  });
});
