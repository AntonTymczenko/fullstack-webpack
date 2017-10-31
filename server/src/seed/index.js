const mongoose = require('mongoose')
const {User, Song} = require('../models')

const songs = require('./songs.json')
const users = require('./users.json')

const {ObjectID} = require('mongodb')
const userOneId = new ObjectID()
const userTwoId = new ObjectID()
users[0]._id = userOneId
users[1]._id = userTwoId
songs[0]._creator = userOneId
songs[1]._creator = userTwoId

mongoose.Promise = global.Promise
require('dotenv').config()

const populateUsersPromise = () => {
  const usersToReturn = []
  users.map(user => {
    usersToReturn.push(new User(user).save())
  })
  return Promise.all(usersToReturn)
}
// fire up:
mongoose.connect(
  process.env.MONGODB_URI,
  {useMongoClient: true}
)
  .then(async function () {
    console.log(`connected to ${process.env.MONGODB_URI}`);
    // in case if DB doesn't exist trying to find documents:
    const fetched = await User.find({})
    const fetchedSong = await Song.find({})
    if (!fetched || !fetchedSong) {
      return Promise.reject('can\'t use DB')
    } else {
      return Promise.resolve()
    }
  })
  .then(async function () {
    try {
      await User.remove({}, function(err) {
        if (err) { throw err }
        console.log('collection users dropped')
      })
      await Song.remove({}, function(err) {
        if (err) { throw err }
        console.log('collection songs dropped')
      })
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  })
  .then(populateUsersPromise)
  .then(async function () {
    try {
      await Song.insertMany(songs)
      console.log('new data seeded')
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  })
  .then (() => {
    mongoose.connection.close(null, ()=> {
      console.log('connection to DB closed')
    })
  })
  .catch(err => {
    console.log(err)
  })

// export for TESTs:
const populateSongs = (done) => {
  Song.remove({})
    .then(()=> {
      return Song.insertMany(songs)
    })
    .then(() => done())
}

const populateUsers = (done) => {
  User.remove({})
    .then(populateUsersPromise)
    .then( () => done() )
}

module.exports = {songs, populateSongs, users, populateUsers}
