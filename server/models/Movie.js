const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  genre: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
