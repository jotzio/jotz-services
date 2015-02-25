var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

// TODO: update schema based on final requirements

var UserSchema = new mongoose.Schema({
  appId: { type: String, required: true, index: { unique: true } },
  password: { type: String },
  githubId: { type: String },
  salt: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('appId')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    } else {
      var password = this.appId + process.env.APP_ID_PEPPER;
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

UserSchema.methods.compareAppId = function(attempted) {
  var defer = Q.defer();
  var saved = this.password;
  var password = attempted + process.env.APP_ID_PEPPER;
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
