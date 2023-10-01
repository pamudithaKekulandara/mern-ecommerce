const { doubleCsrf } = require('csrf-csrf')

const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => csrfSecret,
  cookieName: 'X-CSRF-Token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
  },
  getTokenFromRequest: (req) => req.headers['X-CSRF-Token'],
})

module.exports = { generateToken, doubleCsrfProtection }
