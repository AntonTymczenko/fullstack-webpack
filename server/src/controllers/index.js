const fs = require('fs'),
  path = require('path'),
  controllers = {}

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    controllers[path.basename(file, path.extname(file))] = require('./' + file)
  })

module.exports = controllers
