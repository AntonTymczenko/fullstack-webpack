// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan')

// configuration:
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
}

// modules:
const {mongoose} = require('./mongoose')

// middleware and some other stuff:
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
require('./passport')

// routes:
require('./routes')(app)

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
module.exports = {app}
