//controllers:
const {
    Authentication,
    Songs,
    Users
  } = require('./controllers')

//policies:
const AuthenticationPolicy = require('./policies').Authentication


module.exports = (app) => {
  //users:
  app.post('/register',
    AuthenticationPolicy.register,
    Authentication.register)
  app.post('/login',
    Authentication.login)
  app.get('/users/:id',
    Users.getUser)
  //songs:
  app.get('/songs',
    Songs.index)
  app.post('/songs',
    Songs.create)
  app.get('/songs/:id',
    Songs.show)
  app.post('/songs/:id',
    Songs.update)
}
