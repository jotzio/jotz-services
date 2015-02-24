var auth = require('../auth/auth_api');
var gistController = require('./gist_controller');

module.exports = function(app) {
  app.post('/publish', auth.authenticateGh, gistController.publish);
};
