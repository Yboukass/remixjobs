var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./api');

var app = express();

// appel de l'api et affichage dans la console node
api.getJSON('localhost:27017/nodetest2','annonces','https://remixjobs.com/',function(callback){console.log(callback);});
		
module.exports = app;