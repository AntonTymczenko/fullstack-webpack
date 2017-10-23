// dependencies:
const express = require('express'),
  bodyParser = require('body-parser'),
  // cors = require('cors'),
  morgan = require('morgan')

// configuration:
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  process.env.NODE_ENV = process.env.NODE_ENV === 'test' ? 'test' : 'development'
}

// modules:
const {mongoose} = require('./mongoose')
const app = express()

// models:
const {User} = require('./models')

// some stuff:
app.use(morgan('combined'))
app.use(bodyParser.json())
// app.use(cors())

// routes:
require('./routes')(app)

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
