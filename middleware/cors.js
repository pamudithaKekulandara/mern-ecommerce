const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.status(200).end()
  } else {
    next() 
  }
}

module.exports = { corsMiddleware }
