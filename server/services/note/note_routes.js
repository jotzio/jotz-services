var noteController = require('./note_controller');

module.exports = function(app) {
  app.param('noteId', noteController.findNote);
  app.get('/:noteId', noteController.display);
  app.post('/publish', noteController.publish);
};
