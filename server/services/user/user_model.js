var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;


var UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, index: { unique: true } },
  password: { type: String },
  salt: { type: String },
  ghAccessToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('githubId')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    } else {
      var password = this.githubId + process.env.GITHUB_ID_PEPPER;
      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        } else {
          this.password = hash;
          this.salt = salt;
          next();
        }
      }.bind(this));
    }
  }.bind(this));
});

UserSchema.methods.compareGithubId = function(attempted) {
  var defer = Q.defer();
  var saved = this.password;
  var password = attempted + process.env.GITHUB_ID_PEPPER;
  bcrypt.compare(password, saved, function(err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

module.exports = mongoose.model('users', UserSchema);
