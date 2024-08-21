const {verify} = require('jsonwebtoken')
const appError = require('../utils/appError')
const authConfig = require('../configs/auth')

function ensureAuth(req, res, next) {
  const authToken = req.headers.authorization

  if(!authToken) {
    throw new appError('JWT token is missing', 401)
  }
  
  const [, token] = authToken.split(' ')

  try {
    const {sub: user_id} = verify(token, authConfig.jwt.secret)
    req.user = {
      id: Number(user_id)
    }
    return next()
  } catch (error) {
    throw new appError('JWT token is missing', 401);
    
  }
}

module.exports = ensureAuth