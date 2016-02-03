var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/amazon';

mongoose.connect(mongoUri);

app.use( logger('dev') );
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false} ) );

app.listen(port);
console.log('server on ', port)