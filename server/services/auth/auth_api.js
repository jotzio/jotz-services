var userAPI = require('../user/user_api');

// Private Authentication API
var api = {
  ghOAuthHandler: function(req, res, next) {
    var userData = {
      githubId: req.user.id,
      ghAccessToken: req.query.code
    };
    userAPI.findUser('githubId', userData.githubId, function(user) {
      if (!user) {
        // userAPI.createUser(userData);
        // send 200 status
      } else {
        // update user's access token
        // res.sendStatus(200).send(userData.githubId, userData.ghAccessToken);
      }
      // FOR TESTING GH OAUTH FLOW - REMOVE ME
      res.sendStatus(200);
    });
  }
  // TODO: '/api/auth/userdata' handler
  // hits '/api/auth/ghlogin' (should autoreturn gh id and access token)
};

// Public Authentication API
module.exports = {
  ghOAuthHandler: function(req, res, next) {
    api.ghOAuthHandler(req, res, next);
  }
};
