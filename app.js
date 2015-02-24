// Configure app environment
var dotenv = require('dotenv');
dotenv.load();

// Start app server
require('./server/server.js').listen(process.env.PORT || 8000);
