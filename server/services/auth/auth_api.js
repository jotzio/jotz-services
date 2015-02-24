var userAPI = require('../user/user_api');
var pp = require('passport');
var request = require('request');
var env = require('../../config/env');

// Private Authentication API
var api = {
  ghAuthRouter: function(appId, cb, registeredUser) {
    if (registeredUser) {
      api.registeredRouter(registeredUser, cb);
    } else {
      api.signupRouter(appId, cb);
    }
  },
  signupRouter: function(appId, cb) {
    userAPI.createUser(appId, api.ghOAuth.bind(null, cb));
  },
  registeredRouter: function(registeredUser, cb) {
    if (api.githubAuthed(registeredUser)) {
      cb(registeredUser);
    } else {
      api.ghOAuth(cb, registeredUser);
    }
  },
  githubAuthed: function(user) {
    if (user.githubId) {
      return true;
    }
  },
  nextRoute: function(req, res, next, authedUser) {
    if (authedUser) {
      req.user = authedUser;
      next();
    } else {
      res.sendStatus(403);
    }
  },
  ghOAuth: function(cb, user) {
    request.get(env.url + 'api/auth/ghlogin');
  },
  ghOAuthHandler: function(req, res, next) {
    // TODO: find user and update with req.user data
    // then trigger next route
    next();
  },
  authenticateGh: function(req, res, next) {
    var cb = api.nextRoute.bind(null, req, res, next);
    var appId = req.body.appId;
    userAPI.isRegistered(appId, api.ghAuthRouter.bind(null, appId, cb));
  },
  authenticateLocal: function(req, res, next) {
    // TODO: #hold until team locks cloud features and UX
  }
};


// Public Authentication API
module.exports = {
  authenticateGh: function(req, res, next) {
    api.authenticateGh(req, res, next);
  },
  ghOAuthHandler: function(req, res, next) {
    api.ghOAuthHandler(req, res, next);
  },
  authenticateLocal: function(req, res, next) {
    api.authenticateLocal(req, res, next);
  }
};
