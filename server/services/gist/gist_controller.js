var request = require('request');

module.exports = {
  publish: function(req, res, next) {
    var ghAccessToken = req.body.ghAccessToken;
    var githubId = req.body.githubId;
    var gistContent = req.body.noteBlock;
    var key = "test-gist." + gistContent.language;
    var gist = {
      description: "test gist for api testing",
      public: true,
      files: {}
    };
    gist.files[key] = {
      content: gistContent
    };
    var options = {
      method: 'POST',
      url: 'https://api.github.com/gists?access_token=' + ghAccessToken,
      data: JSON.stringify(gist),
      headers: { 'User-Agent': 'Jotz-Services' }
    };

    // TODO send correct response to desktop app
    // TODO publish gist to GH
    // TODO handle response from GH
    //request(options, function(err, resp, body) {
    //  console.log(arguments);
    //});
    // TODO refactor
  }
};
