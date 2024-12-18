const { hashPassword, comparePassword } = require('../utils/bcryptHelper')
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

        res.status(201).json({ message: 'ユーザー登録完了', token, username })
      }
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ユーザーログイン
exports.login = async (req, res) => {
  try {
    // 送信されたデータを取得
    const { email, password } = req.body

    // データベースからメールアドレスを元にユーザー情報を検索する
    User.login(email, async (err, user) => {
      // データベース操作中にエラーが発生した場合のエラーハンドリング
      if (err) return res.status(500).json({ error: 'Database error' })

      // 該当するユーザーが見つからない場合
      if (!user) return res.status(404).json({ error: 'User not found' })

      // パスワードの比較
      const isMatch = await comparePassword(password, user.password)

      if (!isMatch) {
        // パスワードが一致しない場合
        return res.status(401).json({ error: 'Incorrect password' })
      }

      // JWTを生成
      const token = generateToken({
        username: user.username,
        email: user.email,
      })

      // パスワードが一致する場合のレスポンス
      res
        .status(200)
        .json({ message: 'ログイン成功', token, username: user.username })
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
