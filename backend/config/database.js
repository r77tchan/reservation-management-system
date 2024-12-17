// requireされると接続を実行するファイル

const mysql = require('mysql2')
const dotenv = require('dotenv')

// .envファイルの内容を読み込み、環境変数 (process.env) に設定
dotenv.config({ path: __dirname + '/../.env' })

console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_PASSWORD:', process.env.DB_PASSWORD)
console.log('DB_NAME:', process.env.DB_NAME)

// 接続準備
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// 接続を実行
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err)
    console.log('データベース接続失敗: /backend/config/database.js')
    return
  }

  console.log('データベース接続成功: /backend/config/database.js')
})

// エクスポート
module.exports = connection
