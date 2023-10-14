const { config } = require('../config/config')

const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('X-Frame-Options', 'DENY')
  
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.status(200).end()
  } else {
    next() 
  }
}

module.exports = { corsMiddleware }
