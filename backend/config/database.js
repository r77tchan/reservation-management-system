const mysql = require('mysql2')
const dotenv = require('dotenv')

// .envのデータを環境変数process.envへ
dotenv.config({ path: __dirname + '../.env' })

const connection = mysql.createConnection({
  //
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err)
    console.log('データベース接続失敗: /backend/config/database.js')
    return
  }

  console.log('データベース接続成功: /backend/config/database.js')
})

module.exports = connection
