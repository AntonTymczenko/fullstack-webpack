const {User} = require('../models'),
  _ = require('lodash')

function setTokenHeaders (token) {
  return {
    'x-auth': token,
    'Access-Control-Expose-Headers': 'x-auth'
  }
}

module.exports = {
  register (req, res) {
    const body = _.pick(req.body, ['email', 'password']),
      user = new User(body)

    user.save()
      .then(() => {
        return user.generateAuthToken()
      })
      .then(token => {
        res.set(setTokenHeaders(token)).status(200).send(user)
      })
      .catch(err => {
        let error
        if (err.code && err.code == '11000') {
          error = 'Such email is already registered.'
        } else if (err.name === 'ValidationError') {
          if (err.errors.email) {
            error = 'Email is required'
          } else {
            error = 'Password is required'
          }
        } else {
          error = 'Registration failed'
        }
        res.status(400).send({error})
      })
  },
  login (req, res) {
    const {email, password} = _.pick(req.body, ['email', 'password'])

    User.findByCredentials(email, password)
      .then(user => {
        return user.generateAuthToken()
          .then(token => {
            res.set(setTokenHeaders(token)).status(200).send(user)
          })
      })
      .catch(err => {
        if (err.error) {
          res.status(403).send({
            error: 'The login information was incorrect'
          })
        } else{
          res.status(500).send({
            error: 'Something went wrong trying to log in'
          })
        }
      })
  }
}
