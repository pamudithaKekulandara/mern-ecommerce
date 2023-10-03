const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const { config } = require('../config/config')

const User = mongoose.model('User')
const secret = config.JWT_SECRET

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user)
        }

        return done(null, false)
      })
      .catch((err) => {
        return done(err, false)
      })
  })
)

module.exports = async (app) => {
  app.use(passport.initialize())

  await googleAuth()
}

const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.GOOGLE_CLIENT_ID,
          clientSecret: config.GOOGLE_CLIENT_SECRET,
          callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ email: profile.email })
            .then((user) => {
              if (user) {
                return done(null, user)
              }

              const newUser = new User({
                provider: 'Google',
                name: profile.displayName,
                email: profile.email,
                hashed_password: null,
                about: null,
              })

              newUser.save((err, user) => {
                if (err) {
                  return done(err, false)
                }

                return done(null, user)
              })
            })
            .catch((err) => {
              return done(err, false)
            })
        }
      )
    )
  } catch (error) {
    console.log('Missing google keys')
  }
}
