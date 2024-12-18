// データベース接続
const database = require('../config/database')

const User = {
  // ユーザー登録
  register: (data, callback) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
    database.query(query, [data.username, data.email, data.password], callback)
  },
}

module.exports = User
