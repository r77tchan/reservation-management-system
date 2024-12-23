// トークンの検証を行い、トークンに含まれるユーザーデータをreq.userに格納する

const { verifyToken } = require('../utils/jwtHelper')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // "Bearer <token>" 形式からトークンを抽出

  if (!token) return res.status(401).json({ error: 'トークンがありません' })

  try {
    const payload = verifyToken(token)
    req.user = payload // 検証に成功したトークンのデータをリクエストに添付
    next()
  } catch (err) {
    res.status(403).json({ error: 'トークンが無効です' })
  }
}

module.exports = authenticateToken
