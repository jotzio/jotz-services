// Environment Variables
module.exports = {
  githubOptions: {
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: process.env.GH_CB_URL || 'http://localhost:8000/auth/github/cb'
  }
};
