// データベース接続
const database = require('../config/database')

// DB処理
const User = {
  // ユーザー登録
  register: (data, callback) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
    database.query(query, [data.username, data.email, data.password], callback)
  },
  // ユーザーログイン
  login: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`
    database.query(query, [email], (err, results) => {
      // エラーが発生した場合、コールバックにエラーを渡し、`null` を返す
      if (err) return callback(err, null)

      // 検索結果が1件以上の場合、`results[0]`（最初のユーザーオブジェクト）をコールバックに渡す
      if (results.length > 0) return callback(null, results[0])

      // ユーザーが見つからなかった場合、`null` をコールバックに渡す
      return callback(null, null)
    })
  },
}

module.exports = User
