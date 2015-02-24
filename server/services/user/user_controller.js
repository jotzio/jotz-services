var User = require('./user_model');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  login: function(req, res, next) {
    // appId setup
    var appId = req.body.appId;
    console.log(appId);
    // github temp code
    //
  }
};
