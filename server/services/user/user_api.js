var Q = require('q');
var User = require('./user_model');


// Private User API
var api = {
  logError: function(err) {
    console.error(err);
  },
  findUser: function(appId, cb) {
    var findUser = Q.nbind(User.findOne, User);
    findUser({ appId: appId }).then(function(user) {
      if (!user) {
        cb(null);
      } else {
        api.authUser(appId, user, cb);
      }
    }).fail(api.logError);
  },
  authUser: function(appId, user, cb) {
    user.compareAppId(appId).then(function(match) {
      if (match) {
        cb(api.safeUser(user));
      }
    }).fail(api.logError);
  },
  createUser: function(appId, cb){
    var createUser = Q.nbind(User.create, User);
    createUser({ appId: appId }).then(function(user) {
      cb(api.safeUser(user));
    }).fail(api.logError);
  },
  safeUser: function(user) {
    return {
      _id: user._id,
      appId: user.appId,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
  }
};

// Public User API
module.exports = {
  isRegistered: function(appId, cb) {
    api.findUser(appId, cb);
  },
  createUser: function(appId, cb) {
    api.createUser(appId, cb);
  }
};
