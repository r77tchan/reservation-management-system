const bcrypt = require('bcrypt')

// パスワードをハッシュ化する関数
const hashPassword = async (password) => {
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (err) {
    throw new Error('パスワードのハッシュ化に失敗しました')
  }
}

// ハッシュ化されたパスワードを検証する関数
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (err) {
    throw new Error('パスワードの検証に失敗しました')
  }
}

module.exports = {
  hashPassword,
  comparePassword,
}
