var express = require('express');
var db = require('./config/db');
var app = express();

// Setup and Connect Db
db.startDbConnection();

// Configure and Start Server
require('./config/middleware.js')(app, express);

module.exports = app;
