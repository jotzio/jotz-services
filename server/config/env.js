var url = 'http://localhost:8000/';
var cbUrl = 'http://localhost:8000/api/auth/github/cb';

if (process.env.NODE_ENV === 'production') {
  url = process.env.APP_URL;
  cbUrl = process.env.GH_CB_URL;
}

// Environment Variables
module.exports = {
  githubOptions: {
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: cbUrl
  },
  url: url
};
