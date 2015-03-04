var Note = require('./note_model');

var api = {
  findNote: function(req, res, next, noteId) {
    Note.findOne({ noteId: noteId }, api.handleNoteQuery.bind(api, req, next));
  },
  handleNoteQuery: function(req, next, err, note) {
    if (err) {
      next(err);
    } else {
      req.note = note;
      next();
    }
  },
  createNote: function(noteData, cb) {
    var allNoteData = {
      url: 'https://jotz-services.herokuapp.com/api/notes/' + noteData._id,
      content: noteData,
      noteId: noteData._id
    }
    Note.findOne({ noteId: noteData._id }, function(err, note) {
      if (err) {
        cb(err);
      } else if (!note) {
        Note.create(allNoteData, function(err, newNote) {
          if (!err) {
            cb(null, newNote.url);
          } else {
            cb(err);
          }
        });
      } else {
        cb(null, note.url);
      }
    });
  }
};

module.exports = {
  findNote: function(req, res, next, noteId) {
    api.findNote(req, res, next, noteId);
  },
  publish: function(req, res, next) {
    var noteData = req.body;
    api.createNote(noteData, function(err, noteUrl) {
      if (!err) {
        res.status(200).send(noteUrl);
      } else {
        res.status(500).send(JSON.stringify(err));
      }
    });
  },
  display: function(req, res, next) {
      // if req.note, load note content into template
      // else, send back error
  }
};
