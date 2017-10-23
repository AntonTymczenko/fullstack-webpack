const mongoose = require('mongoose'),
  {ObjectID} = require('mongodb')

const {MONGODB_URI, MONGODB_URI_TEST} = process.env
console.log(`MONGODB_URI: ${MONGODB_URI}`)

mongoose.Promise = global.Promise
mongoose.connect(
  process.env.NODE_ENV==='test'? MONGODB_URI_TEST : MONGODB_URI,
  {useMongoClient: true}
)

module.exports = {
  mongoose
}
