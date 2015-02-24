var auth = require('../auth/auth_api');
var pp = require('passport');

var ghAuthOptions = {
  session: false,
  scope: 'user,gist'
};

var ghCbOptions = {
  failureRedirect: '/ghlogin',
  session: false
};

module.exports = function(app) {
  app.get('/ghlogin', pp.authenticate('github', ghAuthOptions));
  app.get('/github/cb', pp.authenticate('github', ghCbOptions), auth.ghOAuthHandler);
};
