// Server Helper Functions
module.exports = {
  errorLogger: function(err, req, res, next) {
    console.error(err.status, err.message);
    next(err);
  },
  errorHandler: function(err, req, res, next) {
    res.status(err.status).send({
      status: err.status,
      message: err.message
    });
  },
  githubOptionsHandler: function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
};
