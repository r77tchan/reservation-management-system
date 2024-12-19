const database = require('../config/database')

const User = {
  // ユーザー追加
  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
      database.query(query, [data.username, data.email, data.password], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },

  // ユーザー検索
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`
      database.query(query, [email], (err, results) => {
        if (err) return reject(err)
        resolve(results[0] || null) // ユーザーがいない場合は `null`
      })
    })
  },
}

module.exports = User
