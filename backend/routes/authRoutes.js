const express = require('express')
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router()

// テスト用
router.get('/', authController.home)
// ユーザー登録
router.post('/register', authController.register)
// ユーザーログイン
router.post('/login', authController.login)
// パスワードリセットメール送信
router.post('/reset-password', authController.reset)

module.exports = router
