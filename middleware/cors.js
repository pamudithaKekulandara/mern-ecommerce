const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Content-Type, X-CSRF-Token, x-csrf-token, X-Csrf-Token, CSRF-Token, Content-Security-Policy'
    )
    res.status(200).end()
  } else {
    next() // Continue with the main request
  }
}

module.exports = { corsMiddleware }
