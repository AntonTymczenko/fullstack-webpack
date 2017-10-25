//controllers:
const {
    Authentication,
    Songs
  } = require('./controllers')

//policies:
const AuthenticationPolicy = require('./policies').Authentication


module.exports = (app) => {
  app.post('/register',
    AuthenticationPolicy.register,
    Authentication.register)
  app.post('/login',
    Authentication.login)
  app.get('/songs',
    Songs.index)
  app.post('/songs',
    Songs.create)
}
