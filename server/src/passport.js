const passport = require('passport'),
 JwtStrategy = require('passport-jwt').Strategy,
 {ExtractJwt} = require('passport-jwt')

const {User} = require('./models')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  })
)

module.exports = null
