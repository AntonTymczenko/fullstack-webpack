const {User} = require('../models'),
  _ = require('lodash'),
  {ObjectID} = require('mongodb')

function validID (id) {
  return ObjectID.isValid(id)
}

module.exports = {
  async isBookmarked (req, res) {
    const {userId} = req.params,
      {songId} = req.query
    if (!validID(songId) || !validID(userId)){
      return res.status(400).send({error: 'Bad request'})
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({error: 'Not found'})
    }
    let result
    if (!user.bookmarks || user.bookmarks.indexOf(songId) === -1) {
      result = false
    } else {
      result = true
    }
    res.status(200).send({isBookmarked: result})
  },
  async toggleBookmark (req, res) {
    const {userId} = req.params,
      {songId} = req.query
    if (!validID(songId) || !validID(userId)){
      return res.status(400).send({error: 'Bad request'})
    }
    try {
      const user = await User.findById(userId)
      if (!user) { return res.status(404).send({error: 'Not found'}) }

      const bookmarks = user.bookmarks || []
      const index = user.bookmarks.indexOf(songId)
      const bookmarked = index === -1 ? false : true
      if (!bookmarked) {
        bookmarks.push(songId)
      } else {
        bookmarks.splice(index, 1)
      }
      const userSaved = await User.findByIdAndUpdate(userId, {bookmarks}, {'new': true})
      const newIndex = userSaved.bookmarks.indexOf(songId)
      const newBookmarked = newIndex !== -1
      if (bookmarked !== newBookmarked) {
        res.status(200).send({ isBookmarked: newBookmarked})
      } else {
        throw new Error
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({error: 'Toggling bookmark failed'})
    }
  }
}
