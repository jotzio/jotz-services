var gistController = require('./gist_controller');

module.exports = function(app) {
  app.post('/publish', gistController.publish);
};
