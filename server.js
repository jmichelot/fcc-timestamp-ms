'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');

var app = express();

// var mongoUrl = 'mongodb://localhost:27017/clementinejs';
var mongoUrl = 'mongodb://devuser:devuser@ds015995.mlab.com:15995/fcc';

mongo.connect(mongoUrl, function (err, db) {
   if (err) throw new Error('Database failed to connect!');
   else console.log('Successfully connected to MongoDB.');

   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   routes(app, db);

   app.listen(3000, function () {
      console.log('Node.js listening on port 3000...');
   });

});
