const {Song, User} = require('../models'),
  _ = require('lodash'),
  {ObjectID} = require('mongodb')

function validID (id) {
  return ObjectID.isValid(id)
}

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
  create (req, res) {
    const body = _.pick(req.body, [
      'title', 'artist', 'genre',
      'album', 'albumImage', 'youtubeId',
      'lyrics', 'tab', '_creator'])
    if (!body._creator || !validID(body._creator)) {
      return res.status(400).send({ error: 'Bad request' })
    }
    User.findOne({ _id: body._creator }, (err, user) => {
      if (err || !user) {
        return res.status(403).send({
          error: 'You are not allowed to add a new record'
        })
      } else {
        const song = new Song(body)
        song.save()
          .then( doc => {
            res.status(200).send(doc)
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              error: 'An error has occured trying to create a song' })
          })
      }
    })
  },
  show (req, res) {
    const id = req.params.id
    if (!validID(id)) {
      return res.status(400).send({ error: 'Bad request'})
    }
    Song.findOne({_id: id})
      .then (song => {
        if (!song) {
          return res.status(404).send({error: 'Not found'})
        }
        res.status(200).send(song)
      })
      .catch (err => {
        res.status(500).send({
          error: 'Error has occured while trying to find this song'
        })
      })
  }
}
