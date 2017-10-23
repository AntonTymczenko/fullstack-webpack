const {User} = require('../models'),
  _ = require('lodash')

module.exports = {
  register (req, res) {
    let body = _.pick(req.body, ['email', 'password']),
      user = new User(body)

    user.save()
      .then(() => {
        return user.generateAuthToken()
      })
      .then((token) => {
        res.header('x-auth', token).status(200).send(user)
      })
      .catch((err) => {
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
  }
}
