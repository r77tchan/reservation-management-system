const { hashPassword, comparePassword } = require('../utils/bcryptHelper')
const { generateToken } = require('../utils/jwtHelper')
const { sendEmail } = require('../utils/emailHelper')

const User = require('../models/User')

// テスト用
exports.home = (req, res) => {
  res.send('auth')
}

// ユーザー登録
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // メールアドレスが既に登録されているか確認
    const user = await User.findUserByEmail(email)
    if (user) {
      return res.status(409).json({ error: 'このメールアドレスは既に登録されています' })
    }

    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(password)

    // ユーザー登録
    const result = await User.insertUser({ username, email, password: hashedPassword })
    const userId = result.insertId // id取得

    // JWTを生成
    const token = generateToken({ userId, username, email })

    res.status(201).json({ message: 'ユーザー登録完了', token, username })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'サーバーエラーが発生しました' })
  }
}

// ユーザーログイン
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // メールアドレスでユーザーを検索
    const user = await User.findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ error: '登録されていないメールアドレス' })
    }

    // パスワードの比較
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'パスワードが一致しません' })
    }

    // JWTを生成
    const token = generateToken({ userId: user.id, username: user.username, email: user.email })

    res.status(200).json({ message: 'ログイン成功', token, username: user.username })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'サーバーエラーが発生しました' })
  }
}

// パスワードリセットメール送信
exports.reset = async (req, res) => {
  try {
    const { email } = req.body

    // メールアドレスでユーザーを検索
    const user = await User.findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ error: '登録されていないメールアドレス' })
    }

    // パスワードリセット用トークン生成
    const resetToken = generateToken({ email }, '1h') // 有効時間: 1時間

    // リセットリンク作成
    const resetLink = `${process.env.API_BASE_URL}/to-do-reset-link?token=${resetToken}`

    // メール送信
    await sendEmail(email, 'パスワードリセット', `パスワードリセットリンクは未実装: ${resetLink}`)

    res.status(200).json({ message: 'リセットメールを送信しました。' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'メール送信中にエラーが発生しました。' })
  }
}
