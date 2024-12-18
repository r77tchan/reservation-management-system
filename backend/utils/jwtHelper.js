const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

// JWTトークンを生成する関数
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// JWTトークンを検証する関数
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    throw new Error('トークンが無効です')
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
