const {Song} = require('../models'),
  _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.find({})
      res.status(200).send(songs)
    } catch (err) {
      res.status(400).send({
        error: 'An error has occured trying to fetch songs'
      })
    }
  },
  async create (req, res) {
    const body = _.pick(req.body, [
      'title', 'artist', 'genre',
      'album', 'albumImage', 'youtubeId',
      'lyrics', 'tab'])
    try {
      // TODO: fetch user which creates this song
      // body._creator = req.user._id
      const song = new Song(body)

      const doc = await song.save()
      res.status(200).send(doc)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a song'
      })
    }
  }
}
