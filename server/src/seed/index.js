const {User, Song} = require('../models')

const songs = require('./songs.json')
const users = require('./users.json')

// const {ObjectID} = require('mongodb')
// const userOneId = new ObjectID()
// const userTwoId = new ObjectID()
// songs[0]._creator = userOneId

let user, song
for (let i=0; i<users.length; i++) {
  user = new User(users[i])
  user.save()
    .then(savedUser => {
      if (i === 0) {
        song = new Song(songs[0])
        song._creator = savedUser._id
        song.save()
      } else if (i === 1) {
        for (let j=1; j<songs.length; j++) {
          song = new Song(songs[j])
          song._creator = savedUser._id
          song.save()
        }
      }
      })
    .catch(err => {
      console.log(err)
    })
}
