// Server Helper Functions
module.exports = {
  errorLogger: function(err, req, res, next) {
    console.error(err.status, err.message);
    next(err);
  },
  errorHandler: function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status).send({
      status: status,
      message: err
    });
  },
  githubOptionsHandler: function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
};
