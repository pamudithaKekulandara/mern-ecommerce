const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require('../controllers/auth')
const { userSignupValidator } = require('../validator')
const { config } = require('../config/config')
const clientUrl = config.CLIENT_URL

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force',
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${clientUrl}/signin`,
    session: false,
  }),
  (req, res) => {
    const payload = {
      _id: req.user._id,
    }

    // TODO find another way to send the token to frontend
    const token = jwt.sign(payload, config.JWT_SECRET)
    // const jwtToken = `Bearer ${token}`
    res.cookie('t', token, { expire: new Date() + 9999 })
    const { _id, name, email, role } = req.user
    res.redirect(
      `${clientUrl}/auth/success?token=${token}&id=${_id}&role=${role}&name=${name}&email=${email}`
    )
  }
)

module.exports = router
