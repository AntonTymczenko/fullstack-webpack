const fs = require('fs'),
  path = require('path'),
  policies = {}

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    policies[path.basename(file, path.extname(file))] = require('./' + file)
  })

module.exports = policies
