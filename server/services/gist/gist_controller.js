var request = require('request');

var api = {
  prepareGistload: function(req) {
    var key = "test-gist." + req.body.noteBlock.language;
    var gist = {
      description: "test gist for api testing",
      public: true,
      files: {}
    };
    gist.files[key] = { content: req.body.noteBlock.content };
    return JSON.stringify(gist);
  },
  prepareAccessToken: function(req) {
    return req.body.ghAccessToken;
  },
  prepareOptions: function(req) {
    return {
      url: 'https://api.github.com/gists?access_token=' + api.prepareAccessToken(req),
      method: 'POST',
      body: api.prepareGistload(req),
      headers: { 'User-Agent': 'Jotz-Services' }
    };
  },
  publish: function(req, res, next) {
    request(api.prepareOptions(req), function (error, response, body){
      console.log(response);
    });
    // TODO send correct response to desktop app
  }
};


module.exports = {
  publish: function(req, res, next) {
    api.publish(req, res, next);
  }
};
