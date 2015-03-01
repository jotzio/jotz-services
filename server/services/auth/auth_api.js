var userAPI = require('../user/user_api');
var request = require('request');


// Private Authentication API
var api = {
  handleAuthorization: function(req, res, next) {
    var userData = {
      githubId: req.user.id,
      ghAccessToken: req.user.accessToken
    };
    var query = { githubId: userData.githubId };
    userAPI.findUser(query, api.respondWithUser.bind(api, res, userData));
  },
  createNewUser: function(userData, res) {
    userAPI.createUser(userData, function() {
      var data = '<html>' +
          '<body>' +
          '</body>' +
          '<script>' +
          'var ipc = require("ipc");' +
          'ipc.send("body-scraped", ' + JSON.stringify(userData) + ');' +
          '</script>' +
          '</html>';
      res.status(200).send(data);
    });
  },
  updateUser: function(userData) {
    var query = { githubId: userData.githubId };
    var attrs = { ghAccessToken: userData.ghAccessToken };
    userAPI.updateUser(query, attrs);
  },
  sendUser: function(res, userData) {
    var data = '<html>' +
        '<body>' +
        '</body>' +
        '<script>' +
        'var ipc = require("ipc");' +
        'ipc.send("body-scraped", ' + JSON.stringify(userData) + ');' +
        '</script>' +
        '</html>';
    res.status(200).send(data);
  },
  respondWithUser: function(res, userData, user) {
    console.log(arguments);
    //if (!user) {
    //  api.createNewUser(userData, res);
    //} else {
    //  api.updateUser(userData);
    //  api.sendUser(res, userData);
    //}
  }
};

// Public Authentication API
module.exports = {
  handleAuthorization: function(req, res, next) {
    api.handleAuthorization(req, res, next);
  }
};
