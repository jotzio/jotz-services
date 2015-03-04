module.exports = {
  findNote: function(req, res, next) {
    // lookup based on note _id
    // add note to req.note
  },
  publish: function(req, res, next) {
    // lookup based on note _id
      // if found, send back found url
      // else, create new note and send back url
  },
  display: function(req, res, next) {
      // if req.note, load note content into template
      // else, send back error
  }
};
