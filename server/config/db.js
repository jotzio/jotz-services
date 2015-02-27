var mongoose = require('mongoose');
var env = require('./env');

var db = (function() {
  // Private
  var connectDb = function() {
    mongoose.connect(env.db);
    return mongoose.connection;
  };
  var registerListeners = function(DB) {
    DB.on('error', console.error.bind(console, 'mongo connection error:'));
    DB.on('open', console.log.bind(console, 'mongo hooked'));
  };

  // Public
  return {
    startDbConnection: function() {
      registerListeners(connectDb());
    }
  };
})();

module.exports = db;
