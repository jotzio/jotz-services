var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  appId: { type: String, required: true, inde: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true, unique: true },
  salt: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(this.password, salt, null, function(err, hash) {
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

UserSchema.methods.comparePassword = function(attempted) {
  var defer = Q.defer();
  bcrypt.compare(attempted, this.password, function(err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

module.exports = mongoose.model('users', UserSchema);
