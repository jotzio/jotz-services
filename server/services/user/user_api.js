var Q = require('q');
var User = require('./user_model');


// Private User API
var api = {
  logError: function(err) {
    console.error(err);
  },
  findUser: function(query, cb) {
    var findUser = Q.nbind(User.findOne, User);
    findUser(query).then(function(user) {
      if (!user) {
        cb(null);
      } else {
        cb(api.safeUser(user));
      }
    }).fail(api.logError);
  },
  createUser: function(userData, cb) {
    var createUser = Q.nbind(User.create, User);
    createUser(userData).then(function(user) {
      cb(api.safeUser(user));
    }).fail(api.logError);
  },
  updateUser: function(query, attrs) {
    console.log(query, attrs);
    //User.findOneAndUpdate(query, attrs, function() {});
  },
  safeUser: function(user) {
    return {
      _id: user._id,
      githubId: user.githubId,
      ghAccessToken: user.ghAccessToken,
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
  findUser: function(query, cb) {
    api.findUser(query, cb);
  },
  updateUser: function(query, attrs) {
    api.updateUser(query, attrs);
  }
};
