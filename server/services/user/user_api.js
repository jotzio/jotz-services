var Q = require('q');
var User = require('./user_model');

// TODO: update with final requirements

// Private User API
var api = {
  createUser: function(userData, cb){
    var createUser = Q.nbind(User.create, User);
    createUser(userData).then(function(user) {
      cb(api.safeUser(user));
    }).fail(api.logError);
  },
  logError: function(err) {
    console.error(err);
  },
  findUser: function(key, val, cb) {
    var findUser = Q.nbind(User.findOne, User), query = {};
    query[key] = val;
    findUser(query).then(function(user) {
      if (!user) {
        cb(null);
      } else {
        cb(api.safeUser(user));
      }
    }).fail(api.logError);
  },
  safeUser: function(user) {
    return {
      _id: user._id,
      appId: user.appId,
      githubId: user.githubId,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
  }
};

// Public User API
module.exports = {
  createUser: function(userData, cb) {
    api.createUser(userData, cb);
  },
  findUser: function(key, val, cb) {
    api.findUser(key, val, cb);
  }
};
