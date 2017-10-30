const {User} = require('../models'),
  _ = require('lodash'),
  {ObjectID} = require('mongodb')

function validID (id) {
  return ObjectID.isValid(id)
}

module.exports = {
  async getUser (req, res) {
    const id = req.params.id
    if (!validID(id)){
      return res.status(400).send({error: 'Bad request'})
    }
    try {
      const user = await User.findById(id)
      res.status(200).send(user)
    } catch (err) {
      res.status(404).send({error: 'Not found'})
    }
  }
}
