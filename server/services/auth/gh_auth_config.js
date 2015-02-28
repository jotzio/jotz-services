// Configurations for GitHub OAuth
module.exports = {
  ghAuthOptions: {
    session: false,
    scope: 'user,gist'
  },
  ghCbOptions: {
    failureRedirect: '/api/auth/ghlogin',
    session: false
  }
};
