const  Joi = require('joi'),
  _ = require('lodash')

module.exports = {
  register (req, res, next) {
    const body = _.pick(req.body, ['email', 'password'])
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(/^.{8,200}$/)
    }
    const {error, value} = Joi.validate(body, schema)

    if (error) {
      console.log('poop')
      let e = 'Invalid registration information.'
      switch (error.details[0].context.key) {
        case 'email':
          e = 'Invalid email.'
          break
        case 'password':
          e = 'Invalid password. Should contain from 8 to 200 characters.'
          break
      }
      res.status(400).send({error: e})
    } else {
      next()
    }
  }
}
