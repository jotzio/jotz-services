var pp = require('passport');
var auth = require('../auth/auth_api');
var path = require('path');
var ghAuthConfig = require('../auth/gh_auth_config');

module.exports = function(app) {
  // Kick off GitHub OAuth Flow
  app.get('/ghlogin',
    pp.authenticate('github', ghAuthConfig.ghAuthOptions));
  // Handle GitHub OAuth Success Callback
  app.get('/github/cb',
    pp.authenticate('github', ghAuthConfig.ghCbOptions), auth.handleAuthorization);
};
