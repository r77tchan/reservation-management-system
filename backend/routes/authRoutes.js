const express = require('express')
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router()

// テスト用
router.get('/', authController.home)
// ユーザー登録
router.post('/register', authController.register)
// ユーザーログイン
router.post('/login', authController.register)

module.exports = router
