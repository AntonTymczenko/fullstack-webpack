const {Song, User} = require('../models'),
  _ = require('lodash'),
  {ObjectID} = require('mongodb')

function validID (id) {
  return ObjectID.isValid(id)
}
function pickSong (body) {
  return _.pick(body, [
      'title', 'artist', 'genre',
      'album', 'albumImage', 'youtubeId',
      'lyrics', 'tab', '_creator'])
}
const indexQueryFields = ['title', 'artist', 'genre', 'album']

module.exports = {
  async index (req, res) {
    try {
      const s = req.query.s
      const songs = s ?
        await Song.find({})
          .or(indexQueryFields
            .map( key => ({ [key]: new RegExp(s, 'i') }) )
          )
        : await Song.find({}).limit(10)
      res.status(200).send(songs)
    } catch (err) {
      res.status(400).send({
        error: 'An error has occured trying to fetch songs'
      })
    }
  },
  create (req, res) {
    const body = pickSong(req.body)
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
  },
  update (req, res) {
    const id = req.params.id
    if (!validID(id)) {
      return res.status(400).send({error: 'Bad request'})
    }
    const body = pickSong(req.body)
    Song.findByIdAndUpdate(
      id,
      body,
      {new: true,
      upsert: false}
    )
      .then ( song => {
        if (!song) { throw err }
        res.status(200).send(song)
      })
      .catch ( err => {
        res.status(500).send({error: 'Error while updating'})
      })
  }
}
