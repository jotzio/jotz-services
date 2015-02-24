var userController = require('./user_controller');

module.exports = function(app) {
  app.get('/login', userController.login);
};
