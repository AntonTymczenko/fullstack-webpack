const mongoose = require('mongoose'),
  _ = require('lodash')

const SongSchema = new mongoose.Schema({
  title: { required: true, type: String, minLength: 1, trim: true },
  artist: { required: true, type: String, minLength: 1, trim: true },
  genre: { type: String, trim: true },
  album: { type: String, trim: true },
  albumImage: { type: String, trim: true },
  youtubeId: { type: String, trim: true },
  lyrics: { type: String, trim: true },
  tab: { type: String },
  _creator: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('Song', SongSchema)
