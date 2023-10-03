// import 'dotenv/config'
require('dotenv').config()

exports.config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,

  //DB
  MONGODB_URI: process.env.MONGODB_URI,

  //Braintree
  BRAINTREE_MERCHANT_ID: process.env.BRAINTREE_MERCHANT_ID,
  BRAINTREE_PUBLIC_KEY: process.env.BRAINTREE_PUBLIC_KEY,
  BRAINTREE_PRIVATE_KEY: process.env.BRAINTREE_PRIVATE_KEY,

  //Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}
