const { hashPassword } = require('../utils/bcryptHelper')
const { generateToken } = require('../utils/jwtHelper')
const User = require('../models/User')

// テスト用
exports.home = (req, res) => {
  res.send('auth')
}

// ユーザー登録
exports.register = async (req, res) => {
  try {
    // 送信されたデータを取得
    const { username, email, password } = req.body

    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(password)

    // DB処理実行
    User.register(
      { username, email, password: hashedPassword },
      (err, result) => {
        if (err) return res.status(500).json({ error: err })

        // JWTを生成
        const token = generateToken({ username, email })

        res.status(201).json({ message: 'ユーザー登録完了', token })
      }
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
