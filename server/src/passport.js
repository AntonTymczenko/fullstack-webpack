const passport = require('passport'),
 JwtStrategy = require('passport-jwt').Strategy,
 {ExtractJwt} = require('passport-jwt')

const {User} = require('./models')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async function (jwtPayload, done){
    try {
      // const user = await
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
