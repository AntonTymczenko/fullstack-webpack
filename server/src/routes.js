const {Authentication} = require('./controllers'),
  AuthenticationPolicy = require('./policies').Authentication

module.exports = (app) => {
  app.post('/register',
    AuthenticationPolicy.register,
    Authentication.register)
}
