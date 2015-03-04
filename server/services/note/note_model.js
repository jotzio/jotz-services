var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  url: { type: String },
  content: { type: Object },
  noteId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('notes', NoteSchema);
