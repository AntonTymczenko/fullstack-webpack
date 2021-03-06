//controllers:
const {
    Authentication,
    Songs,
    Users,
    Bookmarks
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
    // TODO: should add policy before SONG UPDATE to check if song._creator == user._id
  app.put('/songs/:id',
    Songs.update)
  // bookmarking
  app.put('/users/:userId/toggleBookmark',
    // TODO:  should add policy checking user's token
    Bookmarks.toggleBookmark)
  app.get('/users/:userId/isBookmarked',
    Bookmarks.isBookmarked)
}
