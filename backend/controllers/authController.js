const bcrypt = require('bcrypt')

const User = require('../models/User')

// テスト用
exports.home = (req, res) => {
  res.send('auth')
}

// ユーザー登録
exports.register = (req, res) => {
  const { username, email, password } = req.body

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err })

    User.register(
      { username, email, password: hashedPassword },
      (err, result) => {
        if (err) return res.status(500).json({ error: err })
        res.status(201).json({ message: 'ユーザー登録完了' })
      }
    )
  })
}
