var request = require('request');
var langExtMap = require('../../config/lang_ext_map');


var api = {
  createFileName: function(req) {
    var ext = langExtMap[req.body.noteBlock.language] || 'txt';
    var title = req.body.noteTitle.toLowerCase().replace(/\s+/gi, '_');
    return title.replace(/["']/gi, '') + '.' + ext;
  },
  emptyGist: function() {
    return {
      description: "",
      public: true,
      files: {}
    };
  },
  gistData: function(req, file) {
    var gist = api.emptyGist();
    gist.files[file] = { content: req.body.noteBlock.content };
    return gist;
  },
  prepareGistload: function(req) {
    return JSON.stringify(api.gistData(req, api.createFileName(req)));
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
    request(api.prepareOptions(req), function (err, response, body) {
      if (!err) {
        var data = JSON.parse(body);
        var resBody = {
          gistUrl: data.html_url,
          gistId: data.id
        };
        res.send(JSON.stringify(resBody));
      }
    });
  },
  update: function(req, res, next) {
    request(api.prepareOptions(req, method), function(err, response, body) {
      if (!err) {
        var data = JSON.parse(body);
        var resBody = {
          gistUrl: data.html_url,
          gistId: data.id
        };
        res.send(JSON.stringify(resBody));
      }
    });
  }
};


module.exports = {
  publish: function(req, res, next) {
    api.publish(req, res, next);
  }
};
