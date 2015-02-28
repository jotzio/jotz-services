var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var pp = require('passport');
var gitHubStrategy = require('passport-github').Strategy;
var helpers = require('./helpers');
var env = require('./env');

module.exports = function (app, express) {
  // Routers
  var authRouter = express.Router();
  var gistRouter = express.Router();

  // General configs
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Authentication configs
  pp.use(new gitHubStrategy(env.githubOptions, helpers.githubOptionsHandler));
  app.use(pp.initialize());

  // API router registrations
  app.use('/api/auth', authRouter);
  app.use('/api/gists', gistRouter);

  // Inject routers into respective route files
  require('../services/auth/auth_routes')(authRouter);
  require('../services/gist/gist_routes')(gistRouter);

  // API error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.get('/*', function(req, res, next) {
    res.send('Jotz-Services');
  });
};